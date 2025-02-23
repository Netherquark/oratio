# Oratio
Description : **Convert PDF files into podcasts**  This project converts text from PDF files into audio podcasts using: BERT, PyMuPDF 
# Features : 
- PDF Text Extraction: Extract text from PDFs using PyMuPDF.
- Text-to-Speech: Convert text to audio using Silero TTS.
- Script Conversion: (Optional) Use Aksharamukha for transliteration.
- Lightweight: Works on both CPU and GPU.
- Customizable: Supports multiple languages and voices.
- Natural sounding AI-generated voice using Silero TTS which is lightweight and runs relatively fast on CPU
- Transliteration English-Hindi using Aksharamukha 
- Using SSML to enhance quality of output audio
# Installation : 
1. Install the required dependencies - 
pip install -r requirements.txt
2. Clone the repository
# Contributing : 
1. Fork the repository 
2. Create a new branch (git checkout -b feature/NewFeature)
3. Commit your changes (git commit -m 'Add some NewFeature')
4. Push to the branch (git push origin feature/NewFeature)
5. Open a pull request 
# Acknowledgments : 
- Silero TTS: snakers4/silero-models for text-to-speech 
- PyMuPDF: PyMuPDF for PDF text extraction 
- Aksharamukha: Aksharamukha for script conversion 
