package main

import (
	"ticket-booking-app/handlers"
	"ticket-booking-app/repositories"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app :=fiber.New(fiber.Config{
		AppName: "チケット予約",
		ServerHeader: "Fiber",
	})

	// Repositories
	eventRepository := repositories.NewEventRepository(nil)

	// Routing
	server := app.Group("/api")

	// Handlers
  handlers.NewEventHandler(server.Group("/event"), eventRepository)

  app.Listen(":3000")
}