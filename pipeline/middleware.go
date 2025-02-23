package pipeline

import (
	"context"
	"net/http"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"github.com/netherquark/oratio/utils"
)

func PipelineMiddleware(prod *kafka.Producer, cons *kafka.Consumer) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := context.WithValue(r.Context(), utils.PipelineProducer, prod)
			ctx = context.WithValue(ctx, utils.PipelineConsumer, cons)
			r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
