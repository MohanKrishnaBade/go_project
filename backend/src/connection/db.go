package connection

import (
	"database/sql"
	"../structs"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"github.com/gorilla/mux"
	"encoding/json"
	"strconv"
	"fmt"
	"strings"
)

type Article = structs.Article
type ArticleType = structs.Type

func Connection() (db *sql.DB) {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := "r00tmysql"
	dbName := "go_project"
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}
	return db
}

func GetListOfArticleTypes() []ArticleType {
	tableName := "type"
	db := Connection()
	selDB, err := db.Query("SELECT * FROM " + tableName + " ORDER BY id DESC")
	if err != nil {
		panic(err.Error())
	}
	types := []ArticleType{}

	for selDB.Next() {
		var id, name, createdAt string

		err = selDB.Scan(&id, &name, &createdAt)
		if err != nil {
			panic(err.Error())
		}

		types = append(types, ArticleType{
			ID:        id,
			Name:      name,
			CreatedAt: createdAt,
		})
	}
	defer db.Close()
	return types;
}
func FindAll(tableName string) []Article {
	db := Connection()
	selDB, err := db.Query("SELECT * FROM " + tableName + " ORDER BY id DESC")
	if err != nil {
		panic(err.Error())
	}
	articles := []Article{}

	for selDB.Next() {
		var id string
		var header, body, createdAt string
		var Type structs.Type

		err = selDB.Scan(&id, &header, &body, &createdAt, &Type.ID)
		if err != nil {
			panic(err.Error())
		}

		articles = append(articles, Article{
			ID:        id,
			Header:    header,
			Body:      body,
			CreatedAt: createdAt,
			Type:      &Type,
		})
	}
	defer db.Close()
	return articles;
}

func FindById(tableName, id string) Article {
	db := Connection()
	selDB, err := db.Query("SELECT * FROM "+tableName+" WHERE id=?", id)
	if err != nil {
		panic(err.Error())
	}
	Article := Article{}

	for selDB.Next() {
		var id string
		var header, body, createdAt string
		var Type structs.Type
		err = selDB.Scan(&id, &header, &body, &createdAt, &Type.ID)
		if err != nil {
			panic(err.Error())
		}

		Article.ID = id
		Article.Header = header;
		Article.Body = body;
		Article.CreatedAt = createdAt
		Article.Type = &Type
	}
	defer db.Close()
	return Article;
}

func Insert(r *http.Request) Article {
	db := Connection()

	params := mux.Vars(r)
	tableName := params["type"] + "_article"
	var article Article
	_ = json.NewDecoder(r.Body).Decode(&article)

	insForm, err := db.Prepare("INSERT INTO " + tableName + " (header, body) VALUES(?,?)")
	if err != nil {
		panic(err.Error())
	}
	value, err := insForm.Exec(article.Header, article.Body)

	if err != nil {
		panic(err.Error())
	}
	id, err := value.LastInsertId()
	if err != nil {
		panic(err.Error())
	}
	defer db.Close();
	return FindById(tableName, strconv.FormatInt(id, 10));
}

func Delete(r *http.Request) {
	db := Connection()
	params := mux.Vars(r)
	tableName := params["type"] + "_article"

	delForm, err := db.Prepare("DELETE FROM " + tableName + " WHERE id=?")
	if err != nil {
		panic(err.Error())
	}
	delForm.Exec(params["id"])
	defer db.Close()
}

func Update(r *http.Request) Article {
	db := Connection()
	params := mux.Vars(r)
	tableName := params["type"] + "_article"
	insForm, err := db.Prepare("UPDATE " + tableName + " SET header=?, body=? WHERE id=?")
	if err != nil {
		panic(err.Error())
	}
	var article Article
	_ = json.NewDecoder(r.Body).Decode(&article)

	insForm.Exec(article.Header, article.Body, params["id"])
	defer db.Close()
	return FindById(tableName, params["id"]);
}

func Search(tableName, searchTerm string) []Article {
	db := Connection();
	s := fmt.Sprintf(""+
		"select * from  %s "+
		"where header like %s%s%s"+
		" or body like %s%s%s"+
		" order by id desc", tableName, "%", searchTerm, "%", "%", searchTerm, "%");
	s = strings.Replace(s, "'", "", -1)
	s = strings.Replace(s, "like ", "like '", -1)
	s = strings.Replace(s, "% o", "%' o", -1)

	selDB, err := db.Query(s)
	if err != nil {
		panic(err.Error())
	}
	articles := []Article{}

	for selDB.Next() {
		var id, header, body, createdAt string
		var Type structs.Type
		err = selDB.Scan(&id, &header, &body, &createdAt, &Type.ID)
		if err != nil {
			panic(err.Error())
		}

		articles = append(articles, Article{
			ID:        id,
			Header:    header,
			Body:      body,
			CreatedAt: createdAt,
			Type:      &Type,
		})
	}
	defer db.Close()
	return articles;
}
