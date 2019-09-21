package chat

import (
	"html/template"
	"log"
	"net/http"
	"sync"
	"path/filepath"
	"../chat/room"
	"flag"
)

// templ represents a single template
type templateHandler struct {
	once     sync.Once
	filename string
	templ    *template.Template
}

// ServeHTTP handles the HTTP request.
func (t *templateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	t.once.Do(func() {
		t.templ = template.Must(template.ParseFiles(filepath.Join("templates",
			t.filename)))
	})
	t.templ.Execute(w, r)
}

func main() {
	//just   like a const for server port number..
	var addr = flag.String("addr", ":8080", "The addr of the  application.")
	flag.Parse()

	// new chat room created.
	r := room.NewRoom()

	//render the html template to the view.
	http.Handle("/", &templateHandler{filename: "chat.html"})

	//serve  the chatting functionality to all our chat rooms.
	http.Handle("/room", r)

	// get the room going
	go r.Run()

	// start the web server
	log.Println("Starting web server on", *addr)

	if err := http.ListenAndServe(*addr, nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
