from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
html = (root / "index.html").read_text(encoding="utf-8")

required = [
    'id="forgeAI"',
    'class="moduleCarousel"',
    'id="clearModal"',
    'GROQ_API_KEY',
    'function demo()',
    'async function writeWorkspace()',
]

missing = [item for item in required if item not in html]
if missing:
    print("Missing required application anchors:", missing)
    sys.exit(1)

secret_pattern = re.compile(r"gsk_[A-Za-z0-9_-]{12,}")
for path in root.rglob("*"):
    if not path.is_file() or ".git" in path.parts:
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    if secret_pattern.search(text):
        print(f"Potential Groq credential committed in {path.relative_to(root)}")
        sys.exit(1)

scripts = re.findall(r"<script>(.*?)</script>", html, flags=re.S)
if not scripts:
    print("No inline application script found")
    sys.exit(1)

out = root / ".tmp-inline-script.js"
out.write_text("\n".join(scripts), encoding="utf-8")
print("Static structure validation passed")
