package model

import (
	"fmt"
	"github.com/BurntSushi/toml"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Mysql struct {
	Personal Database
	Teamwork Database
}

type Database struct {
	Host     string `toml:"host"`
	Username string `toml:"username"`
	Password string `toml:"password"`
	Database string `toml:"database"`
	Port     string `toml:"port"`
}

type Conf struct {
	Mysql    Mysql
	Personal bool
}

type Model struct {
	Id        int   `json:"id";gorm:"PRIMARY_KEY;AUTO_INCREMENT;NOT NULL"`
	Status    uint8 `json:"status";gorm:"DEFAULT:0;type:tinyint;NOT NULL"`
	CreatedAt int64 `json:"created_at";gorm:"DEFAULT:0;NOT NULL;type:int(10);index:time_index"`
}

var db *gorm.DB

func InitDB() {
	conf := Conf{}
	_, err := toml.DecodeFile("./config/config.toml", &conf)
	if err != nil {
		panic("获取配置文件失败，请检查配置项")
	}
	var host, username, password, port, dbname string

	if conf.Personal {
		host = conf.Mysql.Personal.Host
		username = conf.Mysql.Personal.Username
		password = conf.Mysql.Personal.Password
		dbname = conf.Mysql.Personal.Database
		port = conf.Mysql.Personal.Port
	} else {
		host = conf.Mysql.Teamwork.Host
		username = conf.Mysql.Teamwork.Username
		password = conf.Mysql.Teamwork.Password
		dbname = conf.Mysql.Teamwork.Database
		port = conf.Mysql.Teamwork.Port
	}

	conn := username + ":" + password + "@tcp(" + host + ":" + port + ")/" + dbname + "?charset=utf8&parseTime=True&loc=Local"
	db, err = gorm.Open("mysql", conn)
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
