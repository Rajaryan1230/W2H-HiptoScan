#!/usr/bin/env python
"""
Check whether GEMINI_API_KEY works and whether configured Gemini models support
generateContent.

Usage:
  python scripts/check_gemini.py
  python scripts/check_gemini.py --models gemini-2.5-flash,gemini-2.5-pro
  GEMINI_API_KEY=... GEMINI_VISION_MODEL=... python scripts/check_gemini.py
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path


API_ROOT = "https://generativelanguage.googleapis.com/v1beta"
DEFAULT_MODELS = ("gemini-2.5-flash", "gemini-2.5-pro")


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def mask_key(value: str) -> str:
    if len(value) <= 10:
        return "*" * len(value)
    return f"{value[:6]}...{value[-4:]}"


def request_json(method: str, url: str, api_key: str, payload: dict | None = None) -> dict:
    data = None
    headers = {"x-goog-api-key": api_key}
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"

    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {exc.code}: {body}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error: {exc.reason}") from exc


def normalize_model_name(model: str) -> str:
    return model.removeprefix("models/").strip()


def get_models_from_env() -> list[str]:
    values = [
        os.environ.get("GEMINI_VISION_MODEL"),
        os.environ.get("GEMINI_TEXT_MODEL"),
        os.environ.get("GEMINI_MODEL"),
    ]
    models = [normalize_model_name(value) for value in values if value]
    return list(dict.fromkeys(models or DEFAULT_MODELS))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate Gemini API key and model names.")
    parser.add_argument(
        "--models",
        help="Comma-separated model names to test. Defaults to GEMINI_* env vars, then gemini-2.5-flash and gemini-2.5-pro.",
    )
    parser.add_argument(
        "--env-file",
        help="Optional dotenv file to load before checking. Defaults to .env, or backend/.env when run from repo root.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    env_file = Path(args.env_file) if args.env_file else Path(".env")
    if not env_file.exists() and Path("backend/.env").exists():
        env_file = Path("backend/.env")
    load_dotenv(env_file)

    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        print("FAIL: GEMINI_API_KEY is not set.")
        print("Set it locally, or add it in Render environment variables for production.")
        return 2

    models_to_test = (
        [normalize_model_name(model) for model in args.models.split(",") if model.strip()]
        if args.models
        else get_models_from_env()
    )

    print(f"Using GEMINI_API_KEY={mask_key(api_key)}")
    print(f"Testing models: {', '.join(models_to_test)}")

    try:
        models_response = request_json("GET", f"{API_ROOT}/models", api_key)
    except RuntimeError as exc:
        print(f"FAIL: API key/listModels check failed: {exc}")
        return 1

    available = models_response.get("models", [])
    generate_models = {
        normalize_model_name(model.get("name", ""))
        for model in available
        if "generateContent" in model.get("supportedGenerationMethods", [])
    }

    if not generate_models:
        print("FAIL: API key worked, but no generateContent models were returned.")
        return 1

    print(f"OK: API key can list {len(generate_models)} generateContent model(s).")

    failed = False
    for model in models_to_test:
        if model not in generate_models:
            failed = True
            print(f"FAIL: {model} is not available for generateContent with this key.")
            suggestions = [name for name in sorted(generate_models) if "gemini-2.5" in name][:8]
            if suggestions:
                print(f"      Try one of: {', '.join(suggestions)}")
            continue

        payload = {
            "contents": [{"parts": [{"text": "Return JSON: {\"ok\": true}"}]}],
            "generationConfig": {
                "temperature": 0,
                "maxOutputTokens": 64,
                "responseMimeType": "application/json",
            },
        }
        try:
            response = request_json("POST", f"{API_ROOT}/models/{model}:generateContent", api_key, payload)
        except RuntimeError as exc:
            failed = True
            print(f"FAIL: {model} generateContent failed: {exc}")
            continue

        text = (
            response.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )
        if text:
            print(f"OK: {model} generated a response.")
        else:
            failed = True
            print(f"FAIL: {model} returned no text content.")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
