package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"ticket-booking-app/config"
	"ticket-booking-app/db"
	"ticket-booking-app/handlers"
	"ticket-booking-app/middlewares"
	"ticket-booking-app/repositories"
	"ticket-booking-app/services"
)

func main() {
	envConfig := config.NewEnvConfig()
	db := db.Init(envConfig, db.DbMigrator)

	app := fiber.New(fiber.Config{
		AppName:      "チケット予約",
		ServerHeader: "Fiber",
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:8081",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Content-Type,Authorization",
}))

	// Repositories
	authRepository := repositories.NewAuthRepository(db)
	eventRepository := repositories.NewEventRepository(db)
	ticketRepository := repositories.NewTicketRepository(db)

	// Services
	authService := services.NewAuthService(authRepository)

	// Routing
	server := app.Group("/api")

	// Authentication
	handlers.NewAuthHandler(server.Group("/auth"), authService)
	privateRoutes := server.Use(middlewares.AuthProtected(db))

	// Handlers
	handlers.NewEventHandler(privateRoutes.Group("/event"), eventRepository)
	handlers.NewTicketHandler(privateRoutes.Group("/ticket"), ticketRepository)


	app.Listen(fmt.Sprintf(":%s", envConfig.ServerPort))
}
