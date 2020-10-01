package personal

import "workbench/model"

type Menu struct {
	model.Model
	Name string
	Path string
	Meta string
}

func GetMenu() ([]Menu, error) {
	m := make([]Menu, 0)
	if err := model.GetDb().Find(&m).Error; err != nil {
		return m, err
	}
	return m, nil
}
