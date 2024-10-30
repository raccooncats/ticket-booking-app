package db

import (
	"gorm.io/gorm"

	"ticket-booking-app/models"
)

func DbMigrator(db *gorm.DB) error {
	return db.AutoMigrate(&models.Event{})
}