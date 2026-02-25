package tasks

import (
	"backend/internal/database"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateTask(c *gin.Context) {
	var task Task
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	task.Status = "todo"
	database.DB.Create(&task)
	c.JSON(http.StatusOK, task)
}

func GetTasks(c *gin.Context) {
	var tasks []Task
	database.DB.Find(&tasks)
	c.JSON(http.StatusOK, tasks)
}

func UpdateTask(c *gin.Context) {
	id := c.Param("id")
	var task Task
	if err := database.DB.First(&task, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Save(&task)
	c.JSON(http.StatusOK, task)
}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")
	database.DB.Delete(&Task{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}
