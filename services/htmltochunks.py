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
from confluent_kafka import Consumer, Producer, KafkaError
from bs4 import BeautifulSoup
import fitz  # PyMuPDF

# Kafka configuration
KAFKA_BOOTSTRAP_SERVERS = "localhost:8082"

# Topics
TOPIC_PDF_TO_HTML = "pdf-to-html"
TOPIC_HTML_TO_CHUNKS = "html-to-chunks"

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

def pdf_to_html(pdf_content):
    """
    Convert PDF content to HTML with each page wrapped in a parent <div>.
    """
    # Open the PDF from bytes
    pdf_document = fitz.open(stream=pdf_content, filetype="pdf")
    html_content = ""

    # Iterate through each page
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        page_text = page.get_text("html")  # Extract text as HTML
        # Wrap the page content in a parent <div>
        html_content += f'<div class="page" id="page{page_num + 1}">{page_text}</div>\n'

    return html_content

def process_message(message, output_topic):
    """
    Process the message and produce it to the next topic.
    """
    # Decode the message (PDF content)
    pdf_content = message.value()
    print("Processing PDF content...")

    # Convert PDF to HTML with each page wrapped in a <div>
    html_content = pdf_to_html(pdf_content)

    # Produce the HTML content to the next topic
    producer.produce(output_topic, html_content.encode("utf-8"))
    print(f"Produced HTML content: {html_content}")

    # Flush the producer to ensure all messages are sent
    producer.flush()

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
        # Stage 1: PDF -> HTML
        consume_and_process(TOPIC_PDF_TO_HTML, TOPIC_HTML_TO_CHUNKS)
    except KeyboardInterrupt:
        print("Pipeline stopped.")
    finally:
        consumer.close()

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
    
        # Stage 2: HTML -> Chunks
        consume_and_process(TOPIC_HTML_TO_CHUNKS, TOPIC_CHUNKS_TO_BART_SUMMARIES)


    except KeyboardInterrupt:
        print("Pipeline stopped.")
    finally:
        consumer.close() 
        
