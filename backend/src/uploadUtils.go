package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"
	"os"
)

func renameFile(src string, dst string) {
	
    os.Rename(src, dst)
} 

func writeUploadDiagram(r *http.Request, ESIndexName string) (string, bool) {

	uploadedFile, handler, err := r.FormFile("diagram")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		var s = ""
		return s, false
	}
	defer uploadedFile.Close()
	uploadedFilename := handler.Filename
	fmt.Printf("Uploaded File: %+v\n", uploadedFilename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	var fileType = filepath.Ext(uploadedFilename)
	//uniqueFileName := "upload-*" + fileType
	newFile, err := ioutil.TempFile("diagram", "upload-")
	if err != nil {
		fmt.Println(err)
		var s = ""
		return s, false
	}
	var newFilenamePath = newFile.Name()
	fmt.Printf("newFilenamePath  : %+v\n", newFilenamePath)

	var newFileNameWithExtension = newFilenamePath + "--" + ESIndexName + fileType
	fmt.Printf("newFileNameWithExtension :", newFileNameWithExtension)
	// ioutil.TempFile appends random unique id at end of file name, cannot deterministically
	// set file name extensions as the will appanded , need to explicitly rename the file  
	renameFile(newFilenamePath,newFileNameWithExtension)
	// filename returned includes its directory , want to just get filename
	fna := strings.Split(newFileNameWithExtension, "/")
	newFilename := fna[len(fna)-1]

	fmt.Println("newFilename  : %s \n", newFilename)

	defer newFile.Close()

	fileBytes, err := ioutil.ReadAll(uploadedFile)
	if err != nil {
		var s = ""
		return s, false
	}
	// write this byte array to our temporary file
	newFile.Write(fileBytes)

	return newFilename, true

}
