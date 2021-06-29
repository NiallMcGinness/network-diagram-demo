package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func getESIndexName(r *http.Request) string {
	fmt.Printf("Req: %s %s\n", r.Host, r.URL.Path)
	vars := mux.Vars(r)
	ESIndexNameFromURL := vars["index"]

	return ESIndexNameFromURL
}

func processForm(w http.ResponseWriter, r *http.Request) {
	fmt.Println("File Upload Endpoint Hit")

	r.ParseMultipartForm(32 << 20)

    ESIndexName := getESIndexName(r) 
	fileName, fileUploaded := writeUploadDiagram(r,ESIndexName)

	if !fileUploaded {
		errorReply(w)
		return
	}

	fmt.Println("File Upload filename ", fileName)

	descriptionValue, descriptionExists := r.Form["description"]
	fmt.Printf(" value: %v key exists in map: %t  \n", descriptionValue, descriptionExists)
	if !descriptionExists {
		errorReply(w)
		return
	}

	versionValue, versionExists := r.Form["version"]
	fmt.Printf(" value: %v key exists in map: %t  \n", versionValue, versionExists)
	if !versionExists {
		versionValue = nil
	}

	tagsValue, tagsExists := r.Form["tags"]
	fmt.Printf(" value: %v key exists in map: %t  \n", tagsValue, tagsExists)
	if !tagsExists {
		errorReply(w)
		return
	}

	var Id = genUUID()

	formData := FormEntry{
		Id:          Id,
		Filename:    fileName,
		Description: descriptionValue[0],
		Version:     versionValue[0],
		Tags:        tagsValue[0],
	}

	// add index name from url
	
	successfullyUploadedToES := uploadToIndex(formData, ESIndexName)

	if !successfullyUploadedToES {
		errorReply(w)
		return
	}

	successReply := JSONReply{

		Type: "upload_succeded",
		Body: formData.Id,
	}

	result, err := json.Marshal(successReply)

	if err != nil {
		fmt.Println(err)
		errorReply(w)
		return
	}

	fmt.Println("error checking complete, writing success response")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(result)
}
