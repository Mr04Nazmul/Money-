"""Private Bengali voice synthesis API. Run on a GPU host with IndicF5 installed."""
import io, os, tempfile, threading
from fastapi import FastAPI, File, Form, UploadFile, HTTPException, Header
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sadia AI")
app.add_middleware(CORSMiddleware, allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:8000")], allow_methods=["GET","POST"], allow_headers=["*"])
_model = None
_lock = threading.Lock()

@app.get("/health")
def health():
    return {"ok": True, "model_loaded": _model is not None, "gpu_required_for_speed": True}

@app.post("/voice")
async def voice(text: str = Form(...), ref_text: str = Form(...), reference: UploadFile = File(...), x_api_key: str | None = Header(default=None)):
    global _model
    secret = os.getenv("SADIA_API_KEY")
    if not secret or x_api_key != secret:
        raise HTTPException(401, "Private API key required")
    if not 1 <= len(text.strip()) <= 500 or not ref_text.strip():
        raise HTTPException(400, "Text and exact reference transcript required")
    if reference.content_type not in ("audio/wav","audio/x-wav","audio/wave"):
        raise HTTPException(415, "Use WAV audio")
    data = await reference.read(15*1024*1024+1)
    if not data or len(data)>15*1024*1024:
        raise HTTPException(413, "Invalid audio size")
    import numpy as np
    import soundfile as sf
    with _lock:
        if _model is None:
            from transformers import AutoModel
            _model = AutoModel.from_pretrained("ai4bharat/IndicF5", trust_remote_code=True)
        with tempfile.NamedTemporaryFile(suffix=".wav") as f:
            f.write(data)
            f.flush()
            generated = _model(text, ref_audio_path=f.name, ref_text=ref_text)
        samples = np.asarray(generated)
        if samples.dtype == np.int16:
            samples = samples.astype(np.float32)/32768.0
        else:
            samples = samples.astype(np.float32)
        out = io.BytesIO()
        sf.write(out, samples, 24000, format="WAV")
        out.seek(0)
    return StreamingResponse(out, media_type="audio/wav", headers={"Cache-Control":"no-store"})

from chat import router as chat_router
app.include_router(chat_router)
