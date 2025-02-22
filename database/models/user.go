package models

type User struct {
	ID           uint64 `db:"id" json:"id"`
	PasswordHash string `db:"password_hash" json:"-"`
	Name         string `db:"name" json:"name"`
	Email        string `db:"email" json:"email"`
}
