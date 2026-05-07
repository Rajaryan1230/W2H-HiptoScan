#!/usr/bin/env python
"""Run the backend Gemini checker from the repository root."""

from __future__ import annotations

import runpy
from pathlib import Path


runpy.run_path(str(Path(__file__).resolve().parents[1] / "backend" / "scripts" / "check_gemini.py"), run_name="__main__")
