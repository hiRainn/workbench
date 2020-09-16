package websocket

import (
	"fmt"
	"golang.org/x/net/websocket"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func StartWebSocket(port int) {
	addr := ":" + strconv.Itoa(port)
	if err := http.ListenAndServe(addr, websocket.Handler(talk)); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

}

//var client map[*websocket.Conn]*websocket.Conn =

type Connect struct {
	Content string
	Token   string
}

func talk(ws *websocket.Conn) {
	//var err error
	//if client[ws] == nil && ws != nil {
	//	client[ws] = ws
	//}
	fmt.Println("上线了")
	for {
		reply := make([]byte, 1024)
		if err := websocket.Message.Receive(ws, &reply); err != nil {
			if err == io.EOF {
				ws.Close()
				break
			}
		}
		if err := websocket.Message.Send(ws, strings.ToUpper(string(reply))); err != nil {
			fmt.Println("222222", err)
			continue
		}
	}

}

func talkToAll() {

}
