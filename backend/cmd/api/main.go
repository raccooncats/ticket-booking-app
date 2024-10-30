package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"

	"ticket-booking-app/config"
	"ticket-booking-app/db"
	"ticket-booking-app/handlers"
	"ticket-booking-app/repositories"
)

func main() {
	envConfig := config.NewEnvConfig()
	db := db.Init(envConfig, db.DbMigrator)

	app :=fiber.New(fiber.Config{
		AppName: "チケット予約",
		ServerHeader: "Fiber",
	})

	// Repositories
	eventRepository := repositories.NewEventRepository(db)

	// Routing
	server := app.Group("/api")

	// Handlers
  handlers.NewEventHandler(server.Group("/event"), eventRepository)

  app.Listen(fmt.Sprintf(":%s", envConfig.ServerPort))
}