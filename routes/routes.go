package routes

import "github.com/go-chi/chi/v5"

func MountRoutes(r *chi.Mux) {
	mountAuthRoutes(r)
	mountUserRoutes(r)
	mountPodcastsRoutes(r)
}
