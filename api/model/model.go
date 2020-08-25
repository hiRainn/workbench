package model

import (
	"fmt"
	"github.com/BurntSushi/toml"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Mysql struct {
	Username string `toml:"username"`
	Password string `toml:"password"`
	Database string `toml:"database"`
	Port int `toml:"port"`
}

type Conf struct {
	Mysql Mysql
}

type Model struct{
	Id int `json:"id";gorm:"PRIMARY_KEY;AUTO_INCREMENT;NOT NULL"`
	Status uint8 `json:"status";gorm:"DEFAULT:0;type:tinyint;NOT NULL"`
	CreatedAt int64 `json:"created_at";gorm:"DEFAULT:0;NOT NULL;type:int(10);index:time_index"`
}
var db *gorm.DB

func init()  {
	conf := Conf{}
	_,err:=toml.DecodeFile("./config/config.toml",&conf)
	if err != nil {
		panic("获取配置文件失败，请检查配置项")
	}

	conn := conf.Mysql.Username + ":" + conf.Mysql.Password + "@/" + conf.Mysql.Database + "?charset=utf8&parseTime=True&loc=Local"
	db, err = gorm.Open("mysql",conn)
	if err != nil {
		fmt.Println(err)
		panic("failed to connect database")
	} else {
		db.SingularTable(true)
		//db.AutoMigrate()
		db.LogMode(true)
	}
	//Dbchan<- db
}

func GetDb() *gorm.DB {
	return db
}
