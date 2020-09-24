package main

import (
	"fmt"
	"github.com/BurntSushi/toml"
	"github.com/gin-gonic/gin"
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
	car := route.Initroute()
	car.Use(gin.Logger())
	car.Run(":" + config.Port)
}
