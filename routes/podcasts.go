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
	s := r.Context().Value(utils.AuthKey).(sessions.Session)
	db := r.Context().Value(utils.DatabaseKey).(*sqlx.DB)

	var body struct {
		Title       string `json:"title"`
		Abstract    string `json:"abstract"`
		DOI         string `json:"doi"`
		ContentHTML string `json:"content_html"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body provided", http.StatusBadRequest)
		return
	}

	query := `
		INSERT INTO podcasts (title, abstract, doi, created_by, status) VALUES ($1, $2, $3, $4, 'html-to-chunks') RETURNING id
	`
	row := db.QueryRow(query, body.Title, body.Abstract, body.DOI, s.UserID)
	if err := row.Err(); err != nil {
		http.Error(w, "Couldn't create podcast", http.StatusInternalServerError)
		return
	}

	var pID uint64
	if err := row.Scan(&pID); err != nil {
		http.Error(w, "Couldn't create podcast", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}
