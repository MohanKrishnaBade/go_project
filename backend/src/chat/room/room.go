package room

import (
	"github.com/gorilla/websocket"
	"net/http"
	"log"
	"../../tracer"
	"os"
)

type room struct {
	// forward is a channel that holds incoming messages
	// that should be forwarded to the other clients.
	forward chan []byte
	// join is a channel for clients wishing to join the room.
	join chan *client
	// leave is a channel for clients wishing to leave the room.
	leave chan *client
	// clients holds all current clients in this room.
	clients map[*client]bool

	//tracer used to log  client activities..
	tracer tracer.Tracer
}

// client represents a single chatting user.
type client struct {
	// socket is the web socket for this client.
	socket *websocket.Conn
	// send is a channel on which messages are sent.
	send chan []byte
	// room is the room this client is chatting in.
	room *room
}

//this function reads the  messages from the web socket and add as a chat room forward message.
func (c *client) read() {
	defer c.socket.Close()
	for {
		_, msg, err := c.socket.ReadMessage()
		if err != nil {
			return
		}
		c.room.forward <- msg
	}
}

//this function used to write messages to all our current active channels.
func (c *client) write() {
	defer c.socket.Close()
	for msg := range c.send {
		//write the message into the specific client web socket.
		err := c.socket.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			return
		}
	}
}

//this method acts like an observer, it's keep tracking all the activities happened in our chat rooms.
func (r *room) Run() {
	for {
		select {
		//this case is to update the active clients info.
		case client := <-r.join:
			// joining
			r.clients[client] = true
			r.tracer.Trace("New client joined")
			//fmt.Println("New client joined")

			//this case is to remove the inactive clients from our clients list..
		case client := <-r.leave:
			// leaving
			delete(r.clients, client)
			close(client.send)
			r.tracer.Trace("Client left")
			//fmt.Println("Client left")

			//this case is for updating the each and every client send channel.. so that our write method will always have the updated list.
		case msg := <-r.forward:
			// forward message to all clients
			r.tracer.Trace("Message received: ", string(msg))

			//iterate through all the clients and update the client sender channel.
			for client := range r.clients {
				client.send <- msg
				r.tracer.Trace(" -- sent to client")
				//fmt.Println(" -- sent to client")
			}
		}

	}
}

const (
	socketBufferSize  = 1024
	messageBufferSize = 256
)

var upgrader = &websocket.Upgrader{ReadBufferSize: socketBufferSize,
	WriteBufferSize: socketBufferSize}

func (r *room) ServeHTTP(w http.ResponseWriter, req *http.Request) {

	socket, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		log.Fatal("ServeHTTP:", err)
		return
	}

	//join clients into the room. based on web-socket's running count.
	client := &client{
		socket: socket,
		send:   make(chan []byte, messageBufferSize),
		room:   r,
	}
	r.join <- client

	//left the room at the end of the execution.
	defer func() { r.leave <- client }()

	//calling go routine to do write and read operations simultaneously.
	go client.write()

	//read the user input text from the current web socket.
	client.read()
}

// newRoom makes a new room.
func NewRoom() *room {
	return &room{
		forward: make(chan []byte),
		join:    make(chan *client),
		leave:   make(chan *client),
		clients: make(map[*client]bool),
		tracer:  tracer.New(os.Stdout),
	}
}
