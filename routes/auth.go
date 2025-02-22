package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/netherquark/oratio/auth"
)

func mountAuthRoutes(r *chi.Mux) {
	r.Post("/auth/login", auth.LoginHandler)
	r.Post("/auth/logout", auth.LogoutHandler)
	r.Post("/auth/create", auth.CreateUserHandler)
}
