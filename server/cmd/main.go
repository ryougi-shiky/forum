package main

import (
	"fmt"
	"log"

	// "net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"server/repository"
	"server/handler"
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
	server := gin.Default()
	config := cors.DefaultConfig()
    config.AllowAllOrigins = true
    server.Use(cors.New(config))

    server.Use(static.Serve("/", static.LocalFile("./client/build", true)))

    handlers.UserRoutes(r)
    handlers.AuthRoutes(r)
    handlers.PostRoutes(r)
    handlers.NotifyRoutes(r)
    handlers.SearchRoutes(r)

    server.Run()
}
