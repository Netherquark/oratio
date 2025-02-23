package pipeline

import (
	"os"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"github.com/rs/zerolog/log"
)

func getKafkaConfig() *kafka.ConfigMap {
	bootstrapServers := os.Getenv("ORATIO_KAFKA_BOOTSTRAP_SERVERS")
	if bootstrapServers == "" {
		log.Fatal().Msg("ORATIO_KAFKA_BOOTSTRAP_SERVERS was not provided")
	}

	return &kafka.ConfigMap{
		"bootstrap.servers": bootstrapServers,
	}
}

var ProduceTopic = "html_to_chunks"
var ConsumeTopic = "trans_to_audio"

func GetPipelineProducer() *kafka.Producer {
	p, err := kafka.NewProducer(getKafkaConfig())
	if err != nil {
		log.Fatal().Err(err).Msg("Could not connect to Kafka (as producer)")
	}

	return p
}

func GetPipelineConsumer() *kafka.Consumer {
	c, err := kafka.NewConsumer(getKafkaConfig())

	if err != nil {
		log.Fatal().Err(err).Msg("Could not connect to Kafka (as consumer)")
	}

	err = c.SubscribeTopics([]string{ConsumeTopic}, nil)
	if err != nil {
		log.Fatal().Err(err).Msg("Couldn't subscribe to kafka topics")
	}

	return c
}
