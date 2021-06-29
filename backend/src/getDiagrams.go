package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	elastic "gopkg.in/olivere/elastic.v7"
)

func parseVarsFromURL(r *http.Request) string {
	URLVars := mux.Vars(r)
	indexName := URLVars["index"]
	fmt.Println("es indexName ", indexName)
	return indexName
}

func getAllFromES(w http.ResponseWriter, r *http.Request) {

	ctx := context.Background()
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		errorReply(w)
		return
	}

	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.NewWildcardQuery("Description", "*"))

	queryStr, err1 := searchSource.Source()
	queryJs, err2 := json.Marshal(queryStr)

	if err1 != nil || err2 != nil {
		fmt.Println("[esclient][GetResponse]err during query marshal=", err1, err2)
	}
	fmt.Println("[esclient]Final ESQuery=\n", string(queryJs))

	indexName := parseVarsFromURL(r)

	searchService := esclient.Search().Index(indexName).SearchSource(searchSource)

	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
		errorReply(w)
		return
	}

	var diagrams []Diagram

	for _, hit := range searchResult.Hits.Hits {
		var diagram Diagram
		err := json.Unmarshal(hit.Source, &diagram)
		if err != nil {
			fmt.Println(" Getting Diagrams Err=", err)
			errorReply(w)
			return
		}

		diagrams = append(diagrams, diagram)
	}

	for _, s := range diagrams {
		fmt.Printf("diagram found - Description: %s, Version: %s, Tags: %s \n", s.Description, s.Version, s.Tags)
	}

	result, err := json.Marshal(diagrams)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(result)
}
