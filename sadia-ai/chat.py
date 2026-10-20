"""Optional private conversational AI backend. No credentials are sent to the browser."""
import os
import httpx
from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()
class Message(BaseModel):
    role: str
    content: str = Field(min_length=1, max_length=2000)
class ChatRequest(BaseModel):
    messages: list[Message] = Field(min_length=1, max_length=20)

@router.post("/chat")
async def chat(req: ChatRequest, x_api_key: str | None = Header(default=None)):
    from secrets import compare_digest
    secret = os.getenv("SADIA_API_KEY", "")
    if not secret or not x_api_key or not compare_digest(x_api_key, secret):
        raise HTTPException(401, "Private API key required")
    provider_key = os.getenv("SADIA_LLM_API_KEY", "")
    provider_url = os.getenv("SADIA_LLM_URL", "https://api.openai.com/v1/chat/completions")
    model = os.getenv("SADIA_LLM_MODEL", "gpt-4o-mini")
    if not provider_key:
        raise HTTPException(503, "Set SADIA_LLM_API_KEY on the private server")
    if not provider_url.startswith("https://"):
        raise HTTPException(500, "HTTPS LLM endpoint required")
    messages = [{"role":m.role,"content":m.content} for m in req.messages if m.role in ("user","assistant")]
    if not messages or messages[-1]["role"]!="user":
        raise HTTPException(400, "Last message must be from user")
    messages.insert(0, {"role":"system","content":"তুমি সাদিয়া AI, একজন বন্ধুসুলভ বাংলা ভার্চুয়াল সহকারী। স্বাভাবিক, সংক্ষিপ্ত বাংলায় কথা বলো। তুমি AI—বাস্তব মানুষ নও।"})
    try:
        async with httpx.AsyncClient(timeout=40) as client:
            response = await client.post(provider_url,headers={"Authorization":f"Bearer {provider_key}"},json={"model":model,"messages":messages,"max_tokens":300})
            response.raise_for_status()
            answer = response.json()["choices"][0]["message"]["content"]
    except (httpx.HTTPError, KeyError, IndexError, ValueError):
        raise HTTPException(502,"AI provider unavailable")
    return {"reply":str(answer)[:2000]}
