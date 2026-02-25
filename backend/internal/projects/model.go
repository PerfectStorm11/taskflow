package projects

import "gorm.io/gorm"

type Project struct {
	gorm.Model
	Name        string `gorm:"not null"`
	Description string
	OwnerID     uint `gorm:"not null"` // пользователь, создавший проект
}
