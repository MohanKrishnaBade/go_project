package main

import (
	"github.com/gorilla/mux"
	"html/template"
	"net/http"
	"encoding/json"
	"log"
	"sync"
	_ "github.com/go-sql-driver/mysql"
	"../connection"
)

type templateHandler struct {
	once     sync.Once
	filename string
	templ    *template.Template
}

func main() {

	//available routes
	r := mux.NewRouter()
	r.HandleFunc("/articles/{type}/all", getAllArticles).Methods("GET");
	r.HandleFunc("/article/{type}/{id}", getArticleById).Methods("GET")
	r.HandleFunc("/article/{type}/create", createArticle).Methods("POST")
	r.HandleFunc("/article/{type}/{id}", deleteArticle).Methods("DELETE")
	r.HandleFunc("/article/{type}/{id}", updateArticle).Methods("PATCH")
	r.HandleFunc("/search/{type}", search).Methods("GET")
	r.HandleFunc("/news/{type}", getNews).Methods("GET")
	r.HandleFunc("/type/all", getAllArticleTypes).Methods("GET")
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("../../../frontend/build/")))

	//r.HandleFunc("/chat_room", chatApp).Methods("GET")
	////server up and running on 8989 port.
	//r.PathPrefix("/chat_room").Handler(http.FileServer(http.Dir("../../chatApp/public")))
	//r.HandleFunc("/new/user", chater.RegisterNewUser).Methods("POST")
	//r.HandleFunc("/pusher/auth", chater.PusherAuth).Methods("POST")

	log.Fatal(http.ListenAndServe(":8989", r))
}

func getAllArticleTypes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(connection.GetListOfArticleTypes())
}
func getNews(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(connection.FindAll(params["type"] + "_news"))

}
func search(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	v := r.URL.Query()
	searchString := v.Get("value")
	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(connection.Search(params["type"]+"_article", searchString))

}
func chatApp(w http.ResponseWriter, r *http.Request) {

	// -------------------------------------------------------
	// Listen on these routes for new user registration and user authorization,
	// thereafter, handle each request using the matching handler function.
	// -------------------------------------------------------
	//http.HandleFunc("/new/user", chater.RegisterNewUser)
	//http.HandleFunc("/pusher/auth", chater.PusherAuth)
}

/**
 * it should return all the articles of PHP or Go
 * method serves for "/api/articles/all"
 */
func getAllArticles(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(connection.FindAll(params["type"] + "_article"))

	//var articles []Article;
	//connection.Connection()
	//w.Header().Set("content-type", "application/json")
	//json.NewEncoder(w).Encode(helper.ReadArticlesFromFile(params["type"], articles))
}

/**
 * it should return specific article fo GoLang or PHP
 * method serves for "/api/articles/{id}"
 */
func getArticleById(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(connection.FindById(params["type"]+"_article", params["id"]))

	//var articles []Article;
	//articles = helper.ReadArticlesFromFile(params["type"], articles)
	//for _, item := range articles {
	//	if item.ID == params["id"] {
	//		w.Header().Set("content-type", "application/json")
	//		json.NewEncoder(w).Encode(item)
	//		return
	//	}
	//}
}

/**
 * create an article and append that to the global articles variable
 * method serves for "/api/articles/create"
 */
func createArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(connection.Insert(r))

	//params := mux.Vars(r)
	//var article Article
	//_ = json.NewDecoder(r.Body).Decode(&article)
	//article.ID = uuid.New().String();
	//w.Header().Set("content-type", "application/json")
	////connection.WriteInto("go_project", article)
	//json.NewEncoder(w).Encode(article)
	//helper.AppendFile(article, params["type"])
}

/**
 * delete an article from articles list
 * method serves for "/api/articles/delete/{id}"
 */
func deleteArticle(w http.ResponseWriter, r *http.Request) {

	connection.Delete(r);
	//params := mux.Vars(r);
	//var articles []Article;
	//articles = helper.ReadArticlesFromFile(params["type"], articles)
	//for index, item := range articles {
	//	if item.ID == params["id"] {
	//		articles = append(articles[:index], articles[index+1:]...)
	//		w.Header().Set("content-type", "application/json")
	//		json.NewEncoder(w).Encode(articles)
	//		return;
	//	}
	//}
}

func updateArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	json.NewEncoder(w).Encode(connection.Update(r));
}
