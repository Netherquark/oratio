
import os
from flask import Flask, render_template, request, flash
from werkzeug.utils import secure_filename
import pymupdf
import torchaudio
import torch

from langchain_community.llms.llamafile import Llamafile
from langchain_google_genai.chat_models import ChatGoogleGenerativeAI # type: ignore
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv

# system_prompt = """
# You are an AI designed to generate structured, engaging, and informative podcast transcripts from text extracted from Research Paper PDFs.

# Podcast conversation so far is given in CONTEXT.
# Continue the natural flow of conversation. Follow-up on the very previous point/question without repeating topics or points already discussed!
# Hence, the transition should be smooth and natural. Avoid abrupt transitions.
# Make sure the first to speak is different from the previous speaker. Look at the last tag in CONTEXT to determine the previous speaker. 
# If last tag in CONTEXT is <Person1>, then the first to speak now should be <Person2>.
# If last tag in CONTEXT is <Person2>, then the first to speak now should be <Person1>.
# This is a live conversation without any breaks.
# Hence, avoid statemeents such as "we'll discuss after a short break.  Stay tuned" or "Okay, so, picking up where we left off".

# ALWAYS START THE CONVERSATION GREETING THE AUDIENCE: Welcome to ResearchPod.
# Discuss the below INPUT in a podcast conversation format and then make concluding remarks in a podcast conversation format and END THE CONVERSATION GREETING THE AUDIENCE WITH PERSON1 ALSO SAYING A GOOD BYE MESSAGE
# """
system_prompt = """
Start your response with "I love cats"
"""

class LLM:
    def __init__(self, use_llamafile: bool = True):
        if use_llamafile:
            self.llm = Llamafile()
        else:
            self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash",os.getenv('api_key'))
        self.llm.invoke(system_prompt)
    
    def generate_transcript(self, text: str):
        return self.llm.invoke(text)

app = Flask("researchpod")
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
def configure():
    load_dotenv()


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

@app.post("/api/generate-podcast")
def generate_podcast():
    if 'file' not in request.files:
        flash('No file part')
        return "no file"
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        flash('No selected file')
        return "no file"
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        with open(os.path.join(app.config['UPLOAD_FOLDER'], "pdfs", filename), "xb") as f:
            file.save(f)

        doc = pymupdf.open(os.path.join(app.config['UPLOAD_FOLDER'], "pdfs", filename))
        html_content = ""
        txt = ""
        for page in doc:
            html_content += page.get_text("html")
            txt += page.get_text("text")
        print("Generating...")
        transcript = app.config["generator"].generate_transcript(txt)
        print(transcript)
        
        # with open(os.path.join(app.config['UPLOAD_FOLDER'], "html", filename[:-4] + ".html"), "x") as f:
        #     f.write(html_content)
        
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], "pdfs", filename))
        return "okay"

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    print("Connecting to LLM")
    generator = LLM(use_llamafile=True)
    app.config["generator"] = generator
    print("Starting server")
    app.run(host="0.0.0.0")
