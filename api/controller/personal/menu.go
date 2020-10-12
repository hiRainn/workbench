package personal

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"workbench/model/personal"
)

type MenuList struct {
	Path     string    `json:"path"`
	Name     string    `json:"name"`
	Meta     string    `json:"meta"`
	Children *MenuList `json:"children"`
}

//获取菜单
func GetMenu(c *gin.Context) {
	list, err := personal.GetMenu()
	if err != nil {
		return
	}
	res := FormatMenu(list)
	c.JSON(http.StatusOK, res)
}

//新增菜单
func AddMenu(c *gin.Context) {

}

func EditMenu(c *gin.Context) {

}

func DelMenu(c *gin.Context) {

}

func FormatMenu(menus []personal.Menu) []MenuList {
	list := make([]MenuList, 0)

	return list
}
