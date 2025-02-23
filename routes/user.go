package routes

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	"github.com/netherquark/oratio/auth"
	"github.com/netherquark/oratio/database/models"
	"github.com/netherquark/oratio/sessions"
	"github.com/netherquark/oratio/utils"
)

func mountUserRoutes(r *chi.Mux) {
	ur := chi.NewRouter()
	ur.Use(auth.AuthRequired())
	ur.Get("/", getCurrentUser)

	r.Mount("/user", ur)
}

func getCurrentUser(w http.ResponseWriter, r *http.Request) {
	s := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	var user models.User
	if err := db.Get(&user, "SELECT U.id, U.name, U.email FROM users U WHERE id = $1 LIMIT 1", s.UserID); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "No such user found", http.StatusNotFound)
			return
		}

		http.Error(w, "Could not fetch user", http.StatusInternalServerError)
		return
	}

	byts, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "JSON marshalling error", http.StatusInternalServerError)
		return
	}

	w.Write(byts)
}
