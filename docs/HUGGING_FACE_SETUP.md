# Hugging Face Static Space setup

Place `index.html` at the repository root and configure the Space as static.

## FORGE AI

Current demo mode expects:

```text
Secret: GROQ_API_KEY
Optional Variable: GROQ_MODEL
Default model: openai/gpt-oss-20b
```

If `GROQ_API_KEY` is absent, FORGE AI falls back to the deterministic local analytics engine.

## Security

The direct key mode is a deliberate demo/portfolio trade-off. Static browser code is not a secure production location for provider credentials. See [`../SECURITY.md`](../SECURITY.md).
