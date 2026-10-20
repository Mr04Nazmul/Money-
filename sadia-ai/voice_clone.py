"""Bengali reference-conditioned TTS using AI4Bharat IndicF5.

Only use reference audio you own or have explicit permission to clone.
"""
import argparse
from pathlib import Path

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--reference", required=True)
    parser.add_argument("--ref-text", required=True)
    parser.add_argument("--text", required=True)
    parser.add_argument("--output", default="sadia-output.wav")
    args = parser.parse_args()
    reference = Path(args.reference)
    if not reference.is_file():
        parser.error("Reference audio not found")
    if not args.ref_text.strip():
        parser.error("Reference transcript is required")
    from transformers import AutoModel
    import numpy as np
    import soundfile as sf
    model = AutoModel.from_pretrained("ai4bharat/IndicF5", trust_remote_code=True)
    audio = model(args.text, ref_audio_path=str(reference), ref_text=args.ref_text)
    audio = np.asarray(audio)
    if audio.dtype == np.int16:
        audio = audio.astype(np.float32) / 32768.0
    sf.write(args.output, audio.astype(np.float32), samplerate=24000)
    print(f"Saved {args.output}")

if __name__ == "__main__":
    main()
