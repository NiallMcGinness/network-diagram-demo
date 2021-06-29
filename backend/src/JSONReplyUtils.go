package main

import (
	"encoding/json"
	"net/http"
)

type JSONReply struct {
	Type string
	Body string
}

func errorReply(w http.ResponseWriter) {
	errReply := JSONReply{

		Type: "upload_failed",
		Body: "error",
	}

	result, err := json.Marshal(errReply)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(result)
}
