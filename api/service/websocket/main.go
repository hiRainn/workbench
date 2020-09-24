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

type ConnStatus struct {
	Conn    *websocket.Conn //连接
	Key     string          //唯一id标示
	LastAct int64           //上次活动时间
}

type WebSocketService struct {
	Port          int    //监听端口
	MaxClient     int    //最大连接数
	IsCheck       bool   //是否开启不活跃检测
	CleanTime     int64  //检测不活跃时间
	CheckTime     int    //检测频率
	SendMsgBefore bool   //强制下线前是否发送消息
	MsgBefore     string //强制下线前发送的消息
	ClientList    map[string]ConnStatus
}

//启动监听这个服务
func (w *WebSocketService) StartService() {
	if w.IsCheck {
		go w.FlashClient()
	}
	//初始化
	w.ClientList = make(map[string]ConnStatus)
	if w.CleanTime <= 0 {
		w.CleanTime = 60
	}
	if w.CheckTime <= 0 {
		w.CheckTime = 5
	}
	if w.Port == 0 {
		w.Port = 9999
	}
	addr := ":" + strconv.Itoa(w.Port)
	if err := http.ListenAndServe(addr, websocket.Handler(w.Handle)); err != nil {
		fmt.Println("监听错误", err)
		os.Exit(1)
	}

}

func (w *WebSocketService) Handle(ws *websocket.Conn) {
	key := w.SetKey(8)
	w.ClientList[key] = ConnStatus{Conn: ws, Key: key, LastAct: time.Now().Unix()}
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
			break
		}
	}
}

//连接生成唯一key
func (w *WebSocketService) SetKey(l int) string {
	str := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRXTUVWXZY"
	bytes := []byte(str)
	result := []byte{}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < l; i++ {
		result = append(result, bytes[r.Intn(len(bytes))])
	}
	return string(result)
}

//根据key发送消息
func (w *WebSocketService) SenMsg(key, content string) {
	if err := websocket.Message.Send(w.ClientList[key].Conn, content); err != nil {
		fmt.Println("send message error:", err)
	}
}

//广播
func (w *WebSocketService) Broadcast(content string) {
	for _, v := range w.ClientList {
		if err := websocket.Message.Send(v.Conn, content); err != nil {
			fmt.Println("broadcast error:", err)
		}
	}
}

//清除不活跃连接
func (w *WebSocketService) FlashClient() {
	t := time.NewTicker(time.Duration(w.CheckTime) * time.Second)
	for {
		select {
		case <-t.C:
			now := time.Now().Unix()
			for _, v := range w.ClientList {
				if v.LastAct+w.CleanTime < now {
					if w.SendMsgBefore {
						websocket.Message.Send(v.Conn, w.MsgBefore)
					}
					v.Conn.Close()
					delete(w.ClientList, v.Key)
				}
			}
		}
	}
}

//关闭连接
func (w *WebSocketService) CloseService(key string) {
	w.ClientList[key].Conn.Close()
	delete(w.ClientList, key)
}
