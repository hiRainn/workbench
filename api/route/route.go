package route

import (
	"fmt"
	"github.com/BurntSushi/toml"
	"github.com/gin-gonic/gin"
	"workbench/route/personal"
	"workbench/route/teamwork"
)

type conf struct {
	Personal bool
}

func Initroute() *gin.Engine {
	config := conf{}
	_, err := toml.DecodeFile("./config/config.toml", &config)
	if err != nil {
		fmt.Println("读取配置失败")
	}
	var r *gin.Engine
	if config.Personal {
		r = personal.InitPersonalRoute()
	} else {
		r = teamwork.InitTeamRoute()
	}
	return r
}
