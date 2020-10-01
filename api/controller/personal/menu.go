package personal

import (
	"github.com/gin-gonic/gin"
	"workbench/model/personal"
)

//获取菜单
func GetMenu(c *gin.Context) {
	personal.GetMenu()
}

func AddMenu(c *gin.Context) {

}

func EditMenu(c *gin.Context) {

}

func DelMenu(c *gin.Context) {

}
