package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type TestReply struct {
	Type string
	Body string
}

func testResponse(w http.ResponseWriter, r *http.Request) {

	fmt.Println("test page hit ")

	testSuccess := TestReply{
		Type: "fail",
		Body: "fail",
	}

	result, err := json.Marshal(testSuccess)

	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(result)
}
