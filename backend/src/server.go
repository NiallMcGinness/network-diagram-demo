package main

import (
	"fmt"
	"net/http"
	"github.com/rs/cors"
	"github.com/gorilla/mux"
)

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/searchName/{index}", searchName)
	r.HandleFunc("/es/{index}", getESIndex)
	r.HandleFunc("/getall/{index}", getAllFromES)
	r.HandleFunc("/upload/{index}", processForm)
	r.HandleFunc("/diagram/{imageFilename}", serveImage)
	
	r.HandleFunc("/", testResponse)

	var port = ":3001"
	fmt.Println("listening on port ", port)
	//handlers.AllowedOrigins([]string{"*"})
	handler := cors.Default().Handler(r)
	http.ListenAndServe(port, handler)

}
