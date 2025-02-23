package models

type PodcastStatus string

const (
	HTMLToChunksPodcastStatus PodcastStatus = "html-to-chunks"
	ChunksToSumPodcastStatus  PodcastStatus = "chunks-to-sum"
	SumToTransPodcastStatus   PodcastStatus = "sum-to-trans"
	TransToAudioPodcastStatus PodcastStatus = "trans-to-audio"
)

type Podcast struct {
	ID        uint64        `db:"id" json:"id"`
	Title     string        `db:"title" json:"title"`
	Abstract  string        `db:"abstract" json:"abstract"`
	DOI       string        `db:"doi" json:"doi"`
	Status    PodcastStatus `db:"status" json:"status"`
	CreatedBy uint64        `db:"created_by" json:"created_by"`
}
