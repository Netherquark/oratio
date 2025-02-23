package auth

import (
	"context"
	"net/http"
	"os"

	"github.com/gorilla/securecookie"
	"github.com/netherquark/oratio/sessions"
	"github.com/netherquark/oratio/utils"
)

func SecureCookieMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			c := securecookie.New(
				[]byte(os.Getenv("ORATIO_AUTH_HASH_KEY")),
				[]byte(os.Getenv("ORATIO_AUTH_BLOCK_KEY")),
			)
			ctx := context.WithValue(r.Context(), utils.SecureCookieKey, c)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

func AuthMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			sm := r.Context().Value(utils.SessionManagerKey).(*sessions.SessionManager)
			sc := r.Context().Value(utils.SecureCookieKey).(*securecookie.SecureCookie)

			c, err := r.Cookie(COOKIE_NAME)
			if err != nil {
				ctx := context.WithValue(r.Context(), utils.AuthKey, nil)
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			var s sessions.Session
			if err := sc.Decode(COOKIE_NAME, c.Value, &s); err != nil {
				ctx := context.WithValue(r.Context(), utils.AuthKey, nil)
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			if exists, err := sm.CheckSessionExists(s.SessionID); err != nil || !exists {
				http.SetCookie(w, &http.Cookie{
					Name:     COOKIE_NAME,
					Value:    "",
					Path:     "/",
					HttpOnly: true,
					MaxAge:   -1,
				})

				ctx := context.WithValue(r.Context(), utils.AuthKey, nil)
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			ctx := context.WithValue(r.Context(), utils.AuthKey, s)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

func AuthRequired() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			_, ok := r.Context().Value(utils.AuthKey).(sessions.Session)
			if !ok {
				http.Error(w, "Authentication required", http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
