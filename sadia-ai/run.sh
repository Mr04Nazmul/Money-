#!/usr/bin/env bash
set -euo pipefail
: "${SADIA_API_KEY:?Set a strong SADIA_API_KEY}"
python -m uvicorn server:app --app-dir sadia-ai --host 127.0.0.1 --port 8000
