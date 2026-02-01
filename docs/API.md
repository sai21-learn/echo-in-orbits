# API Reference

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-app.vercel.app/api`

---

## Messages

### GET /api/messages

Fetch all visible messages (stars).

**Query Parameters:**
- `sessionId` (optional): Anonymous session identifier

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "position": [123.45, 67.89, -45.12],
    "isLocked": false,
    "likes": 5,
    "category": "hope"
  }
]
```

**Status Codes:**
- `200`: Success
- `500`: Database error

---

### POST /api/messages

Create a new echo (star).

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <clerk_token>` (optional)

**Body:**
```json
{
  "content": "Your message here (10-500 characters)",
  "category": "hope",
  "visibility": "public",
  "deliveryDate": "2026-12-31T23:59:59Z",
  "sessionId": "anonymous-session-id"
}
```

**Fields:**
- `content` (required): Message text (10-500 chars)
- `category` (required): One of: `hope`, `regret`, `advice`, `dream`, `gratitude`
- `visibility` (optional): `public` or `private` (default: `public`)
- `deliveryDate` (optional): ISO 8601 timestamp for time-locked messages
- `sessionId` (optional): Required for anonymous private messages

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "content": "Your message here",
  "category": "hope",
  "visibility": "public",
  "position_x": 123.45,
  "position_y": 67.89,
  "position_z": -45.12,
  "created_at": "2026-02-01T10:00:00Z"
}
```

**Status Codes:**
- `201`: Created successfully
- `400`: Validation error
- `401`: Authentication required (for private messages)
- `500`: Server error

---

### GET /api/messages/[id]

Get details of a specific message.

**Parameters:**
- `id`: Message UUID

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "content": "Message content",
  "category": "hope",
  "visibility": "public",
  "delivery_date": null,
  "position_x": 123.45,
  "position_y": 67.89,
  "position_z": -45.12,
  "likes": 5,
  "user_id": "user_123",
  "created_at": "2026-02-01T10:00:00Z"
}
```

**Status Codes:**
- `200`: Success
- `404`: Message not found
- `403`: Private message, access denied
- `500`: Server error

---

## Likes

### POST /api/messages/[id]/like

Toggle like on a message.

**Parameters:**
- `id`: Message UUID

**Body:**
```json
{
  "sessionId": "anonymous-session-id"
}
```

**Response:**
```json
{
  "liked": true,
  "likes": 6
}
```

**Status Codes:**
- `200`: Success
- `404`: Message not found
- `500`: Server error

---

## Comments

### GET /api/messages/[id]/comments

Get all comments for a message.

**Parameters:**
- `id`: Message UUID

**Response:**
```json
[
  {
    "id": "comment-uuid",
    "content": "Great message!",
    "user_id": "user_123",
    "created_at": "2026-02-01T10:05:00Z"
  }
]
```

**Status Codes:**
- `200`: Success
- `404`: Message not found
- `500`: Server error

---

### POST /api/messages/[id]/comments

Add a comment to a message.

**Parameters:**
- `id`: Message UUID

**Body:**
```json
{
  "content": "Your comment here",
  "sessionId": "anonymous-session-id"
}
```

**Response:**
```json
{
  "id": "comment-uuid",
  "message_id": "550e8400-e29b-41d4-a716-446655440000",
  "content": "Your comment here",
  "user_id": null,
  "session_id": "anonymous-session-id",
  "created_at": "2026-02-01T10:10:00Z"
}
```

**Status Codes:**
- `201`: Created successfully
- `400`: Validation error
- `404`: Message not found
- `500`: Server error

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": "Error message description"
}
```

**Common Errors:**
- `Database not connected`: Supabase configuration issue
- `Invalid category`: Category must be one of the five allowed values
- `Content must be 10-500 characters`: Validation failed
- `Authentication required`: Private message without auth

---

## Rate Limiting

- **Development**: No limits
- **Production**: 100 requests per minute per IP

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706774400
```

---

## Authentication

### Clerk JWT

For authenticated requests, include Clerk session token:

```bash
curl -H "Authorization: Bearer <clerk_token>" \
     https://your-app.vercel.app/api/messages
```

### Anonymous Sessions

For anonymous users, generate a session ID:

```typescript
const sessionId = crypto.randomUUID()
localStorage.setItem('sessionId', sessionId)
```

---

## Examples

### Create Public Echo

```bash
curl -X POST https://your-app.vercel.app/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hope is the thing with feathers",
    "category": "hope",
    "visibility": "public"
  }'
```

### Like a Message

```bash
curl -X POST https://your-app.vercel.app/api/messages/550e8400.../like \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "your-session-id"}'
```

### Add Comment

```bash
curl -X POST https://your-app.vercel.app/api/messages/550e8400.../comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Beautiful message!",
    "sessionId": "your-session-id"
  }'
```
