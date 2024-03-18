package repository

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var host = os.Getenv("MYSQL_HOST")
var port = os.Getenv("MYSQL_PORT")
var user = os.Getenv("MYSQL_USER")
var password = os.Getenv("MYSQL_PASSWORD")
var dbname = os.Getenv("MYSQL_DBNAME")

type MySQLRepository struct {
	db *gorm.DB
}

// Create a new repository object. Connect to the database.
func ConnectToMysql() (*gorm.DB, error) {
	if _, err := os.Stat(".env"); err == nil {
		// .env 文件存在，加载它
		err := godotenv.Load()
		if err != nil {
			log.Fatalf("Error loading .env file: %v", err)
		}
	}

	fmt.Println("MYSQL_HOST:", host)
	fmt.Println("MYSQL_PORT:", port)
	fmt.Println("MYSQL_USER:", user)
	fmt.Println("MYSQL_PASSWORD:", password)
	fmt.Println("MYSQL_DBNAME:", dbname)

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
