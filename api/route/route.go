package route

import (
	"github.com/gin-gonic/gin"
	 a "workbench/controller"
)


var r *gin.Engine
func Initroute() *gin.Engine {
	r := gin.Default()
	//check init
	r.GET("/bac/check_init",a.Test)


	return r
}