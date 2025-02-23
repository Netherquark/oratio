package database

import (
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
)

func ConnectToDatabase() *sqlx.DB {
	dsn := os.Getenv("ORATIO_POSTGRES_DSN")
	if dsn == "" {
		log.Fatal().Msg("ORATIO_POSTGRES_DSN was not provided")
	}

	db, err := sqlx.Connect("postgres", dsn)
	if err != nil {
		log.Fatal().Err(err).Msg("Could not connect to postgres")
	}

	log.Info().Msg("Connected to postgres")
	return db
}
