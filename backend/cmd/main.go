package main

import (
	"backend/internal/auth"
	"backend/internal/database"
	"backend/internal/middleware"
	projects2 "backend/internal/projects"
	tasks2 "backend/internal/tasks"
	"backend/internal/users"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Connecting to database...")
	database.Connect()
	fmt.Println("Running migrations...")
	if err := database.DB.AutoMigrate(&users.User{}, &projects2.Project{}, &tasks2.Task{}); err != nil {
		fmt.Printf("Migration error: %v\n", err)
		os.Exit(1)
	}

	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	api.POST("/register", auth.Register)
	api.POST("/login", auth.Login)

	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware())

	protected.POST("/projects", projects2.CreateProject)
	protected.GET("/projects", projects2.GetProjects)
	protected.DELETE("/projects/:id", middleware.AdminMiddleware(), projects2.DeleteProject)

	protected.POST("/tasks", tasks2.CreateTask)
	protected.GET("/tasks", tasks2.GetTasks)
	protected.PUT("/tasks/:id", tasks2.UpdateTask)
	protected.DELETE("/tasks/:id", tasks2.DeleteTask)

	fmt.Println("Starting server on :8080...")
	if err := r.Run(":8080"); err != nil {
		fmt.Printf("Server failed to start: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Server stopped (unexpectedly)") // если дойдём сюда
}
