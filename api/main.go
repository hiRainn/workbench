package main

import (
	"github.com/gin-gonic/gin"
	"workbench/route"
)

func main() {
	car := route.Initroute()
	car.Use(gin.Logger())
	car.Run()
}