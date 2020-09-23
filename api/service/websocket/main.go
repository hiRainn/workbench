package service

import (
	"fmt"
	"golang.org/x/net/websocket"
	"io"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

type WebSocketService struct {
	Port       int
	MaxClient  int
	ClientList ConnStatus
}

//启动监听这个服务
func (w *WebSocketService) StartService() {

}

//连接生成唯一key
func (w *WebSocketService) SetKey() {

}

//根据key发送消息
func (w *WebSocketService) SenMsg(key, content string) {

}

//广播
func (w *WebSocketService) Broadcast(content string) {

}

//关闭连接
func (w *WebSocketService) CloseService() {

}

type ConnStatus struct {
	Conn    *websocket.Conn //连接
	Uid     string          //唯一id标示
	LastAct int64           //上次活动时间
}

//维护所有已经连接的socket
var clients map[*websocket.Conn]*ConnStatus

//处理会话信息
func talk(ws *websocket.Conn) {
	clients[ws] = &ConnStatus{Conn: ws, Uid: getUid(8), LastAct: time.Now().Unix()}
	fmt.Println(ws.RemoteAddr())
	for {
		reply := make([]byte, 1024)
		if err := websocket.Message.Receive(ws, &reply); err != nil {
			if err == io.EOF {
				ws.Close()
				break
			}
		}
		clients[ws].LastAct = time.Now().Unix()
		if err := websocket.Message.Send(ws, strings.ToUpper(string(reply))); err != nil {
			fmt.Println("222222", err)
			continue
		}
	}

}

func getUid(l int) string {
	str := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRXTUVWXZY"
	bytes := []byte(str)
	result := []byte{}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < l; i++ {
		result = append(result, bytes[r.Intn(len(bytes))])
	}
	return string(result)
}

//广播给所有连接用户
func talkToAll() {

}

//判断是否是心跳,如果是，则更新链接的活动时间
func determineHeart(ws *websocket.Conn) bool {

	return false
}

/*
维护连接，多久没有活动则关闭连接
@param second 无活动丢失连接的时长
@param sleep 多久检查一次
*/

func MaintenanceConn(seconed int64, sleep int) {
	t := time.NewTicker(time.Duration(sleep) * time.Second)
	for {
		select {
		case <-t.C:
			now := time.Now().Unix()
			for _, v := range clients {
				if v.LastAct+seconed < now {
					websocket.Message.Send(v.Conn, "因长时间没有活动断开连接")
					v.Conn.Close()
				}
			}
		}
	}
}

func main() {
	clients = make(map[*websocket.Conn]*ConnStatus)
	addr := ":" + strconv.Itoa(8888)
	go MaintenanceConn(30, 5)
	if err := http.ListenAndServe(addr, websocket.Handler(talk)); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

}
