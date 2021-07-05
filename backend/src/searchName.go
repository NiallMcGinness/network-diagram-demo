package main

import (
	"encoding/json"

	"fmt"

	"context"
	"net/http"

	elastic "gopkg.in/olivere/elastic.v7"
)

type SearchStruct struct {
	Type string
	Data DataStruct
}

type DataStruct struct {
	SearchTerm string
}

type test_struct struct {
	Test string
}

func searchName(w http.ResponseWriter, r *http.Request) {

	fmt.Println("searchName Endpoint Hit")

	/*
	     "data": {
	               "searchTerm": searchTerm
	           },
	   "type": "searchName"
	*/

	decoder := json.NewDecoder(r.Body)

	var t SearchStruct
	err := decoder.Decode(&t)

	if err != nil {
		panic(err)
	}

	fmt.Println(t.Type)
	fmt.Println(t.Data.SearchTerm)

	searchTerm := t.Data.SearchTerm
	//fmt.Println(t.SearchTerm)
	fmt.Println(searchTerm)

	ctx := context.Background()
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}

	//var diagrams []Diagram

	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.NewMatchQuery("Description", searchTerm))

	/* this block will basically print out the es query */
	queryStr, err1 := searchSource.Source()
	queryJs, err2 := json.Marshal(queryStr)

	if err1 != nil || err2 != nil {
		fmt.Println("[esclient][GetResponse]err during query marshal=", err1, err2)
	}
	fmt.Println("[esclient]Final ESQuery=\n", string(queryJs))
	/* until this block */

	indexName := parseVarsFromURL(r)
	searchService := esclient.Search().Index(indexName).SearchSource(searchSource)

	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
		return
	}

	fmt.Println("searchResult ", searchResult)

	var diagrams []Diagram

	for _, hit := range searchResult.Hits.Hits {
		var diagram Diagram
		err := json.Unmarshal(hit.Source, &diagram)
		if err != nil {
			fmt.Println("[Getting Diagrams][Unmarshal] Err=", err)
		}

		diagrams = append(diagrams, diagram)
	}

	if err != nil {
		fmt.Println("Fetching Diagram fail: ", err)
	} else {
		for _, s := range diagrams {
			fmt.Printf("diagram found Description: %s, Version: %s, Tags: %s \n", s.Description, s.Version, s.Tags)
		}
	}
	println(len(diagrams))

	number_of_results := len(diagrams)

	fmt.Println("number_of_results :  ", number_of_results)

	///========================================
	result, err := json.Marshal(diagrams)
	//result, err := json.Marshal(t)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Write(result)
}
