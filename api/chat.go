package main

import (
	"encoding/json"
	"fmt"
	"net"
)

type MSG struct {
	Port string `json:"port"`
	Msg  string `json:"msg"`
}

type conn struct {
	connect net.Conn
	msg     chan string
}

func main() {
	client := make(map[string]conn)
	port := ":5173"

	tcpAddr, err := net.ResolveTCPAddr("tcp4", port)
	if err != nil {
		fmt.Println("创建socket服务失败")
		return
	}
	listener, err := net.ListenTCP("tcp", tcpAddr)
	if err != nil {
		fmt.Println("监听端口失败")
		return
	}
	fmt.Println("正在监听5173端口")
	for {
		connect, err := listener.Accept()
		if err != nil {
			continue
		}
		key := connect.RemoteAddr().String()
		client[key] = conn{connect: connect}
		go say(connect, client)
		go broadcaster(client, connect.RemoteAddr().String()+"上线了")
	}
	listener.Close()
}

func say(connect net.Conn, client map[string]conn) {
	buf := make([]byte, 1024)
	for {
		n, err := connect.Read(buf[0:])
		if err != nil {
			fmt.Println("Read error", err)
		}

		//connect.Write([]byte("I am server, you message :" + strBuffer)) //将client发过来的消息原样发送回去
		var content MSG
		if n != 0 {
			if err := json.Unmarshal(buf[:n], &content); err == nil {
				fmt.Println(content)
				if content.Msg == "fuck" {
					connect.Write([]byte("你被踹出群聊，fuck"))
					connect.Close()
					key := "127.0.0.1:" + content.Port
					delete(client, key)
					break
				}
				if content.Port != "" {
					key := "127.0.0.1:" + content.Port
					client[key].connect.Write([]byte(content.Port + "对你说 :" + content.Msg))
				} else {
					go broadcaster(client, content.Port+"说 :"+content.Msg)
				}
			} else {
				connect.Write([]byte("内容格式错误"))
			}
		}
	}
}

func broadcaster(client map[string]conn, msg string) {
	for _, v := range client {
		v.connect.Write([]byte(msg))

	}
}
