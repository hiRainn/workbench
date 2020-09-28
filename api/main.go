package main

import (
	"fmt"
	"github.com/BurntSushi/toml"
	"github.com/gin-gonic/gin"
	"os"
	"os/signal"
	"syscall"
	"workbench/model"
	"workbench/route"
)

type conf struct {
	Port string
}

func main() {
	config := conf{}
	_, err := toml.DecodeFile("./config/config.toml", &config)
	if err != nil {
		fmt.Println("读取配置失败")
	}
	if config.Port == "" {
		config.Port = "8080"
	}
	model.InitDB()
	car := route.Initroute()
	car.Use(gin.Logger())

	//监听打断信号
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGTERM, syscall.SIGQUIT, os.Interrupt)
	go func() {
		//监听信号中断后完成的回收操作，db的关闭及gin的关闭(此处未停止gin)
		sig := <-sigs
		fmt.Println(sig)
		db := model.GetDb()
		db.Close()
		os.Exit(0)
	}()

	car.Run(":" + config.Port)
}
