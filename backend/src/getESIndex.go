package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	elastic "gopkg.in/olivere/elastic.v7"
)

func getESIndex(w http.ResponseWriter, r *http.Request) {

	ctx := context.Background()
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}

	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.NewWildcardQuery("Description", "*"))
	/* this block will basically print out the es query */
	queryStr, err1 := searchSource.Source()
	queryJs, err2 := json.Marshal(queryStr)

	if err1 != nil || err2 != nil {
		fmt.Println("[esclient][GetResponse]err during query marshal=", err1, err2)
	}
	fmt.Println("[esclient]Final ESQuery=\n", string(queryJs))
	/* until this block */
	// test_diagram_1
	indexName := parseVarsFromURL(r)
	searchService := esclient.Search().Index(indexName).SearchSource(searchSource)

	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
		panic("Client fail ")
	}

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

	result, err := json.Marshal(diagrams)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(result)
}
