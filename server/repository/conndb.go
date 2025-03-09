package repository

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var host = os.Getenv("MYSQL_HOST")
var port = os.Getenv("MYSQL_PORT")
var user = os.Getenv("MYSQL_USER")
var password = os.Getenv("MYSQL_PASSWORD")
var dbname = os.Getenv("MYSQL_DBNAME")

type MySQLUserRepository struct {
	db *gorm.DB
}

// Create a new repository object. Connect to the database.
func ConnectToMysql() (*gorm.DB, error) {
	// Build connection string
	connString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", user, password, host, port, dbname)

	// Create connection pool with database name
	db, err := gorm.Open(mysql.Open(connString), &gorm.Config{})
	if err != nil {
		log.Printf("Error opening database %s connection: %s\n", dbname, err.Error())
		return nil, err
	}
	
	fmt.Printf("Mysql Database Connected!")

	return db, err
}
