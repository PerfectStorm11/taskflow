package auth

import (
	"backend/internal/database"
	"backend/internal/users"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

func Register(c *gin.Context) {
	var input users.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		return
	}
	user := users.User{
		Email:    input.Email,
		Password: string(hashed),
		Role:     "user",
	}

	database.DB.Create(&user)
	c.JSON(http.StatusOK, gin.H{"message": "registered"})
}

func Login(c *gin.Context) {
	var input users.User
	var user users.User
	c.ShouldBindJSON(&input)

	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token, _ := GenerateToken(user.ID, user.Role)
	c.JSON(http.StatusOK, gin.H{"token": token})
}
