package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"

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

	// Repositories
	authRepository := repositories.NewAuthRepository(db)
	eventRepository := repositories.NewEventRepository(db)
	ticketRepository := repositories.NewTicketRepository(db)

	// Services
	authService := services.NewAuthService(authRepository)

	// Routing
	server := app.Group("/api")
	privateRoutes := server.Use(middlewares.AuthProtected(db))

	// Handlers
	handlers.NewAuthHandler(server.Group("/auth"), authService)
	handlers.NewEventHandler(privateRoutes.Group("/event"), eventRepository)
	handlers.NewTicketHandler(privateRoutes.Group("/ticket"), ticketRepository)


	app.Listen(fmt.Sprintf(":%s", envConfig.ServerPort))
}
