package sessions

import (
	"context"
	"os"
	"strconv"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
)

type SessionManager struct {
	client *redis.Client
}

func NewSessionManager() *SessionManager {
	addr := os.Getenv("ORATIO_REDIS_ADDR")
	pass := os.Getenv("ORATIO_REDIS_PASS")
	db, err := strconv.Atoi(os.Getenv("ORATIO_REDIS_DB"))

	if err != nil {
		log.Fatal().Msg("Please check value of ORATIO_REDIS_DB")
	}

	if addr == "" {
		log.Fatal().Msg("ORATIO_REDIS_ADDR was not provided")
	}

	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		DB:       db,
		Password: pass,
	})

	log.Info().Msg("Connected to Redis")
	return &SessionManager{client: client}
}

func (sm *SessionManager) NewSession(userID uint64) (*Session, error) {
	sID := uuid.NewString()
	s := Session{SessionID: sID, UserID: userID}

	if err := sm.client.Set(context.Background(), sID, s.ToJSON(), 0).Err(); err != nil {
		return nil, err
	}

	return &s, nil
}

func (sm *SessionManager) DeleteSession(sessionID string) error {
	return sm.client.Del(context.Background(), sessionID).Err()
}

func (sm *SessionManager) GetSession(sessionID string) (*Session, error) {
	val, err := sm.client.Get(context.Background(), sessionID).Bytes()
	if err != nil {
		return nil, err
	}

	s, err := SessionFromJSON(val)
	if err != nil {
		return nil, err
	}

	return s, nil
}

func (sm *SessionManager) CheckSessionExists(sessionID string) (bool, error) {
	i, err := sm.client.Exists(context.Background(), sessionID).Result()
	if err != nil {
		return false, err
	}

	return i == 1, nil
}
