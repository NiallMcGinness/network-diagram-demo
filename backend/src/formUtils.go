package main

import (
	"fmt"

	guuid "github.com/google/uuid"
)

type FormEntry struct {
	Id          string
	Filename    string
	Description string
	Version     string
	Tags        string
}

func genUUID() string {
	id := guuid.New()
	fmt.Printf("github.com/google/uuid: %s\n", id.String())
	return id.String()
}
