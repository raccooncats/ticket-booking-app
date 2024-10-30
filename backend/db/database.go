package db

import (
	"fmt"

	"github.com/gofiber/fiber/v2/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"ticket-booking-app/config"
)

func Init(config *config.EnvConfig, DbMigrator func(db *gorm.DB) error) *gorm.DB {
	uri := fmt.Sprintf(`
		host=%s user=%s dbname=%s password=%s sslmode=%s port=5432`,
		config.DbHost, config.DbUser, config.DbName, config.DbPassword, config.DbSSLMode,
	)

	db, err := gorm.Open(postgres.Open(uri), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	log.Info("Connected to the database")

	if err := DbMigrator(db); err != nil {
		log.Fatalf("Unable to migrate: %v", err)
	}

	return db
}
