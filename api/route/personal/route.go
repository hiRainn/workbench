package personal

import (
	"github.com/gin-gonic/gin"
	p "workbench/controller/personal"
)

func InitPersonalRoute() *gin.Engine {
	r := gin.Default()
	//menu
	r.GET("menu", p.GetMenu)
	r.POST("menu", p.AddMenu)
	r.PUT("menu/:id", p.EditMenu)
	r.DELETE("menu/:id", p.DelMenu)

	return r

}
