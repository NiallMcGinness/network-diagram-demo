package main

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

func setImageheader(fileType string, w http.ResponseWriter) {
	if fileType == ".png" {
		w.Header().Set("Content-Type", "image/png")
	} else {
		w.Header().Set("Content-Type", "image/jpeg")
	}

}

func serveImage(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Req: %s %s\n", r.Host, r.URL.Path)
	vars := mux.Vars(r)
	imageFilenameFromURL := vars["imageFilename"]

	fmt.Printf("imageFilenameFromURL  %s\n", imageFilenameFromURL)

	hostImageDir := "diagram/"

	hostFilePath := hostImageDir + imageFilenameFromURL
	fmt.Printf("hostFilePath  %s\n", hostFilePath)

	var fileType = filepath.Ext(imageFilenameFromURL)
	fmt.Printf("fileType   %s\n", fileType)

	setImageheader(fileType, w)
	http.ServeFile(w, r, hostFilePath)

}
