package tasks

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Title       string `gorm:"not null"`
	Description string
	Status      string `gorm:"not null"` // todo, in_progress, done
	ProjectID   uint   `gorm:"not null"`
	AssigneeID  uint   `gorm:"not null"` // исполнитель
}
