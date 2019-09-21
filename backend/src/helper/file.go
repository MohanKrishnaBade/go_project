package helper

import (
	"encoding/json"
	"log"
	"os"
	"bufio"
	"../structs"
)

type Article = structs.Article;

//adds content to the specific article file
func AppendFile(article structs.Article, fileType string) {
	fileName := "../../DbFiles/" + fileType + "Articles.txt"
	file, err := os.OpenFile(fileName, os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		log.Fatalf("failed creating file: %s", err)
	}
	defer file.Close()

	var jsonData []byte
	jsonData, err = json.Marshal(article)
	if err != nil {
		log.Println(err)
	}
	// Make sure to close the file when you're done
	_, err = file.WriteString("\n" + string(jsonData))
	if err != nil {
		log.Fatalf("failed writing to file: %s", err)
	}
}

//reads the data from a file and creates a collection of Articles.
func ReadArticlesFromFile(fileType string, articles []structs.Article) []structs.Article {

	fileName := "../../DbFiles/" + fileType + "Articles.txt"
	file, err := os.Open(fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var article Article
		err := json.Unmarshal(scanner.Bytes(), &article)
		if err != nil {
			log.Println(err)
		}
		articles = append(articles, article)
	}
	return articles
}
