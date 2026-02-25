package projects

import (
	"backend/internal/database"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateProject(c *gin.Context) {
	var project Project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	project.OwnerID = c.GetUint("user_id")
	database.DB.Create(&project)
	c.JSON(http.StatusOK, project)
}

func GetProjects(c *gin.Context) {
	var projects []Project
	database.DB.Find(&projects)
	c.JSON(http.StatusOK, projects)
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Delete(&Project{}, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "delete failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}
