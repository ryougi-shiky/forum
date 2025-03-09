package main

import (
	"fmt"
	"log"

	// "net/http"

	// "github.com/gin-gonic/gin"
	"server/repository"
)

func main() {
	fmt.Println("Starting server...")

	db, err := repository.ConnectToMysql()
	if err != nil {
		log.Fatalf("Failed to connect to DB: %s", err.Error())
	}
	log.Println("Connected to DB:", db)
	// userRepository := repository.NewUserRepository(db)
	// log.Fatal(http.ListenAndServe(":8080", router))
}
