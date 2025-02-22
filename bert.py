import subprocess
import gc  # For garbage collection
import torch  # For clearing CUDA cache
import os
from langchain_community.llms.llamafile import Llamafile
from langchain_core.messages import HumanMessage, SystemMessage
from transformers import pipeline, AutoTokenizer
import pymupdf

# Define your system prompt for the LLM.
system_prompt = """
Start your response with "I love cats"
"""

class LLM:
    def __init__(self, use_llamafile: bool = True):
        if use_llamafile:
            self.llm = Llamafile()
        # else:
        #     self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", api_key="YOUR_API_KEY")
        self.llm.invoke(system_prompt)
    
    def generate_transcript(self, text: str):
        return self.llm.invoke(text)

def start_llamafile_server():
    
    llamafile_path = "/home/netherquark/Podcastfy/gemma-2-2b-it.Q6_K.llamafile"

    if not os.path.exists(llamafile_path):
        raise FileNotFoundError(f"Llamafile not found at {llamafile_path}. Check the path.")

    # Correct way to call the command
    # command = ["bash", "-c", f"'{llamafile_path}' -ngl 9999 --server --nobrowser"]
    # try:
    #     process = subprocess.Popen(command)
    #     print(f"Llamafile server started with PID: {process.pid}")
    #     return process
    # except Exception as e:
    #     print(f"Failed to start Llamafile: {e}")
    #     return None

    with open(os.devnull, 'w') as devnull:
        process = subprocess.Popen(
            ["bash", "-c", f"nohup '{llamafile_path}' -ngl 9999 --server --nobrowser > /dev/null 2>&1 &"],
            stdout=devnull, stderr=devnull, preexec_fn=os.setpgrp
        )
    
    print(f"Llamafile server started in the background.")

    return process


import torch
import pymupdf
import gc
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer

# =====================================================
# Load Summarization Model (BART)
# =====================================================
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0 if torch.cuda.is_available() else -1)
tokenizer = summarizer.tokenizer
max_input_tokens = tokenizer.model_max_length  # Max token size

# =====================================================
# Load Translation Model (English to Hindi)
# =====================================================
translator_model_name = "Helsinki-NLP/opus-mt-en-hi"
translator_model = AutoModelForSeq2SeqLM.from_pretrained(translator_model_name)
translator_tokenizer = AutoTokenizer.from_pretrained(translator_model_name)

# =====================================================
# Read the PDF and Extract Text
# =====================================================
doc = pymupdf.open("Implementation_of_Retrieval-Augmented_Generation_RAG_in_Chatbot_Systems.pdf")
full_text = "\n".join([page.get_text("text") for page in doc])

# =====================================================
# Tokenize and Chunk the Text for Summarization
# =====================================================
inputs = tokenizer(full_text, return_tensors="pt", truncation=False)
input_ids = inputs["input_ids"][0].tolist()
chunk_size = 900  # Adjusted for BART model
chunks = [input_ids[i: i + chunk_size] for i in range(0, len(input_ids), chunk_size)]

# =====================================================
# Summarize Each Chunk
# =====================================================
summaries = []
for i, chunk_ids in enumerate(chunks):
    chunk_text = tokenizer.decode(chunk_ids, skip_special_tokens=True)
    print(f"Summarizing chunk {i+1}/{len(chunks)}...")

    try:
        summary = summarizer(chunk_text, max_length=256, min_length=150, do_sample=False)
        summaries.append(summary[0]['summary_text'])
    except Exception as e:
        print(f"Error summarizing chunk {i+1}: {e}")
        continue

# =====================================================
# Translate the Summarized Text to Hindi
# =====================================================
full_summary = " ".join(summaries)
translation_inputs = translator_tokenizer(full_summary, return_tensors="pt", padding=True, truncation=True)
translated_outputs = translator_model.generate(**translation_inputs, max_length=512)
translated_text = translator_tokenizer.decode(translated_outputs[0], skip_special_tokens=True)
# Print Results
print("\n=== Summarized English Text ===")
print(full_summary)

print("\n=== Translated Hindi Text ===")
print(translated_text)
    
# ======================================================
# Free up GPU memory before starting llamafile
# ======================================================
print("Cleaning up VRAM from BART summarization...")

# Delete objects referencing the model and tokenizer
del summarizer
del tokenizer
del inputs
del input_ids
del chunks

# Force garbage collection to free up memory.
gc.collect()

# If using CUDA, empty the cache.
if torch.cuda.is_available():
    torch.cuda.empty_cache()
    print("CUDA cache cleared.")

# ======================================================
# Start llamafile server after VRAM cleanup
# ======================================================
print("Starting llamafile server...")
llamafile_process = start_llamafile_server()

# Now initialize your LLM instance.
print("Connecting to LLM")
generator = LLM(use_llamafile=True)
