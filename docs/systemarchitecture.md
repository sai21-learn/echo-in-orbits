## System Architecture – Echoes in Orbit

### 1. High-Level Architecture
Client (Browser)
→ Next.js App Router
→ API Routes
→ Supabase (PostgreSQL + Realtime)

---

### 2. Frontend Structure

**Three.js Canvas (Core Layer)**
- Infinite starfield using points/sprites
- Camera with smooth zoom and pan (Stellarium-style)
- Logarithmic zoom scaling

**Interaction Layer**
- Raycasting for star selection
- Click enabled only for unlocked stars

**UI Overlay Layer**
- Modal-based UI only
- No HUD, no persistent UI

---

### 3. Star Rendering Logic

Each message maps to one star.

- Position assigned at creation
- Star size constant
- Brightness strictly derived from like count

```
base_brightness = locked ? 0.2 : 0.4
brightness = clamp(base_brightness + likes * 0.05, 0.2, 2.0)
```

No glow, bloom, or lighting effects allowed.

---

### 4. Message State Logic

```
IF now < delivery_date
  state = LOCKED
  readable = false
ELSE
  state = UNLOCKED
  readable = true
```

Computed at request time.

---

### 5. Backend API Logic

**POST /api/messages**
- Validate message
- Validate future delivery date
- Generate deterministic 3D position
- Store message

**GET /api/messages**
- Return all stars
- Include readable flag and like count

**POST /api/reactions**
- Enforce one-like-per-session
- Update like count

**POST /api/comments**
- Validate text length
- Store comment

---

### 6. UI Style Rules
- Black or near-black background
- No labels or tooltips in space
- Typography only inside modals
- Silence-first visual design

