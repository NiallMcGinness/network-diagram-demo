package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
)

type Diagram struct {
	Id          string
	Filename    string
	Description string
	Version     string
	Tags        []string
}

func uploadToIndex(formData FormEntry, esIndexName string) bool {
	fmt.Printf(" uploadToIndex formData  tag %s \n", formData.Tags)

	t := strings.Split(formData.Tags, ",")

	fmt.Println(t[0])

	newDiagram := Diagram{
		Id:          formData.Id,
		Filename:    formData.Filename,
		Description: formData.Description,
		Version:     formData.Version,
		Tags:        t,
	}

	ctx := context.Background()
	esclient, err := GetESClient()
	if err != nil {
		fmt.Println("Error initializing : ", err)
		return false
	}

	dataJSON, err := json.Marshal(newDiagram)
	js := string(dataJSON)
	fmt.Println(js)
	ind, err := esclient.Index().
		Index(esIndexName).
		BodyJson(js).
		Do(ctx)

	if err != nil {
		fmt.Println("Error writing to es index  : ", err)
		return false
	}

	fmt.Println(ind)

	fmt.Println("[Elastic][InsertProduct]Insertion Successful")
	return true

}
