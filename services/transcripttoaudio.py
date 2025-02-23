from confluent_kafka import Consumer, Producer, KafkaError

# Kafka configuration
KAFKA_BOOTSTRAP_SERVERS = "localhost:9092"

# Topics
TOPIC_PDF_TO_HTML = "pdf-to-html"
TOPIC_HTML_TO_CHUNKS = "html-to-chunks"
TOPIC_CHUNKS_TO_BART_SUMMARIES = "chunks-to-bart-summaries"
TOPIC_BART_SUMMARIES_TO_TRANSCRIPT = "bart-summaries-to-transcript"
TOPIC_TRANSCRIPT_TO_AUDIO = "transcript-to-audio"

# Kafka Consumer and Producer configuration
consumer_config = {
    "bootstrap.servers": KAFKA_BOOTSTRAP_SERVERS,
    "group.id": "pipeline-consumer-group",
    "auto.offset.reset": "earliest",
}

producer_config = {
    "bootstrap.servers": KAFKA_BOOTSTRAP_SERVERS,
}

# Create Kafka Consumer and Producer
consumer = Consumer(consumer_config)
producer = Producer(producer_config)

# Function to process messages
def process_message(message, output_topic):
    """
    Process the message and produce it to the next topic.
    """
    print(f"Processing message: {message.value().decode('utf-8')}")
    # Add your processing logic here (e.g., summarization, chunking, etc.)
    processed_message = message.value().decode("utf-8")  # Replace with actual processing logic

    # Produce the processed message to the next topic
    producer.produce(output_topic, processed_message.encode("utf-8"))
    producer.flush()

# Function to consume messages from a topic
def consume_and_process(input_topic, output_topic):
    """
    Consume messages from the input topic, process them, and produce to the output topic.
    """
    consumer.subscribe([input_topic])

    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(f"Error: {msg.error()}")
                break

        # Process the message
        process_message(msg, output_topic)

# Run the pipeline
if __name__ == "__main__":
    try:

     # Stage 4: BART Summaries -> Transcript
        consume_and_process(TOPIC_TOPIC_TRANSLATE_TO_TRANSCRIPT, TOPIC_TRANSCRIPT_TO_AUDIO)

    except KeyboardInterrupt:
        print("Pipeline stopped.")
    finally:
        consumer.close() 
        
