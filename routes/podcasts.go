package routes

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	"github.com/netherquark/oratio/auth"
	"github.com/netherquark/oratio/database/models"
	"github.com/netherquark/oratio/sessions"
	"github.com/netherquark/oratio/utils"
)

func mountPodcastsRoutes(r *chi.Mux) {
	pr := chi.NewRouter()
	pr.Use(auth.AuthRequired())
	pr.Get("/", getPodcasts)
	pr.Post("/new", newPodcast)

	r.Mount("/podcasts", pr)
}

func getPodcasts(w http.ResponseWriter, r *http.Request) {
	s := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	podcasts := make([]models.Podcast, 0)
	query := `SELECT * FROM podcasts WHERE created_by = $1`
	if err := db.Select(&podcasts, query, s.UserID); err != nil {
		http.Error(w, "Couldn't fetch podcasts", http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(podcasts)
	if err != nil {
		http.Error(w, "JSON Marshalling error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func newPodcast(w http.ResponseWriter, r *http.Request) {
	//
}
