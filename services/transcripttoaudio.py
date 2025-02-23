from confluent_kafka import Consumer, Producer, KafkaError

# Kafka configuration
KAFKA_BOOTSTRAP_SERVERS = "localhost:8082"

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
def text_to_speech(text, output_audio_path, language='indic', speaker='v4_indic'):
    """Convert text to speech using Silero TTS."""
    try:
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        model, example_text = torch.hub.load(
            repo_or_dir='snakers4/silero-models',
            model='silero_tts',
            language=language,
            speaker=speaker
        )
        model.to(device)

        # Generate speech
        audio = model.apply_tts(
            text=text,
            speaker=speaker,  # Using dynamic speaker selection
            sample_rate=48000,
            put_accent=True,
            put_yo=True
        )

        # Ensure correct shape for saving
        audio = torch.tensor(audio).unsqueeze(0)

        # Save the audio file correctly
        torchaudio.save(output_audio_path, audio, 48000)

        print(f"Audio saved to {output_audio_path}")
        return True
    except Exception as e:
        print(f"Error generating speech: {e}")
        return False


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
        
