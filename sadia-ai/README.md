# Sadia AI — Bengali Voice Prototype

Isolated experimental branch. Existing Money Wallet app is unchanged.

## Voice engine
Uses [AI4Bharat IndicF5](https://github.com/AI4Bharat/IndicF5) for Bengali zero-shot voice cloning. Requires a clean, consented reference WAV and its **exact transcript**, Hugging Face model access, and preferably a CUDA GPU.

## Setup
```bash
python3.10 -m venv .venv
source .venv/bin/activate
pip install git+https://github.com/ai4bharat/IndicF5.git soundfile numpy
huggingface-cli login
python sadia-ai/voice_clone.py --reference /private/sadia.wav --ref-text "Exact words spoken in the reference clip" --text "হ্যালো, আমি সাদিয়া।" --output /private/sadia-output.wav
```

Voice model quality is not yet verified. No voice or portrait files are committed. Live face animation and live video calling are NOT implemented. Next step: test Bengali synthesis on a GPU and integrate MuseTalk after verifying the audio.
