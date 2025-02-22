package models

type PodcastStrategy string

const (
	DirectLLMPodcastStrategy      PodcastStrategy = "direct-llm"
	SummariesToLLMPodcastStrategy PodcastStrategy = "summaries-to-llm"
)

type Podcast struct {
	ID        uint64          `db:"id" json:"id"`
	Title     string          `db:"title" json:"title"`
	Abstract  string          `db:"abstract" json:"abstract"`
	DOI       string          `db:"doi" json:"doi"`
	Strategy  PodcastStrategy `db:"strategy" json:"strategy"`
	CreatedBy uint64          `db:"created_by" json:"created_by"`
}
