# Security model

FORGE VISION is a local-first portfolio application. Its default design avoids a central inventory database and stores operational state in the user's browser, with optional user-approved local files.

## Trust boundaries

- **Inventory state:** browser localStorage / IndexedDB.
- **Optional workspace files:** user-selected directory via File System Access API.
- **External AI:** optional Groq request from the browser in the current Static Space build.
- **Repository:** no production API credential should ever be committed.

## Current Static Space AI trade-off

The V3.3 FULL portfolio build can read `GROQ_API_KEY` from Hugging Face Static Space variables/secrets and call Groq from client-side JavaScript. This keeps deployment simple, but it is **not a secure secret boundary** because client JavaScript ultimately receives the credential.

This mode is acceptable only for a dedicated, revocable, low-risk demo credential whose exposure is explicitly accepted by the operator.

## Production recommendation

For a real organization or paid API workload:

```text
Browser
  ↓
Authenticated application backend / gateway
  ↓
Provider secret stored server-side
  ↓
Groq / model provider
```

Add rate limiting, authentication, audit logging, usage quotas and origin controls at the server boundary.

## Inventory safety rules

- Outbound movement cannot silently create negative stock.
- Destructive inventory reset requires explicit confirmation.
- AI analysis does not directly execute stock mutations or purchases.
- Workspace access requires user browser permission.
- Invalid CSV records should be rejected or ignored rather than silently corrupting state.

## Reporting a security issue

For portfolio review, open a private communication channel with the repository owner rather than publishing a live credential or sensitive inventory data in a public issue.
