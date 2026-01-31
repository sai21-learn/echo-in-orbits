## Product Requirements Document – Echoes in Orbit

### 1. Product Summary
Echoes in Orbit is a web-based experiential application that visualizes anonymous, time-locked messages as stars in an infinite space environment inspired by Stellarium Web. Users explore space by zooming and panning, discovering messages represented as stars. Messages unlock only after a mandatory delivery date.

---

### 2. Objectives
- Deliver immediate visual and emotional impact within 10 seconds
- Enable meaningful, irreversible message creation
- Support anonymous interaction without accounts
- Ensure clarity, simplicity, and restraint

---

### 3. User Needs
- Express thoughts without identity
- Discover content through exploration, not feeds
- Understand interaction without instructions

---

### 4. Core User Flows

**Create Message**
1. Open app
2. Click "Create Star"
3. Write message
4. Select mandatory future delivery date
5. Submit → locked star appears

**Explore Space**
- Zoom/pan to navigate infinite space
- Distant stars appear faint
- Nearby stars appear brighter and clickable

**Read Message**
- Click unlocked star
- Read message in modal
- Leave like or comment

---

### 5. Functional Requirements
- Anonymous messages only
- Delivery date required and must be in the future
- Messages unreadable before delivery
- Messages immutable after creation

**Reactions**
- Single reaction type: like
- One like per message per session
- Like count increases star brightness

**Comments**
- Anonymous
- Text-only
- Chronological order

---

### 6. Non-Functional Requirements
- 60 FPS target
- Fast initial load (<3s)
- Desktop + mobile support
- Deterministic visuals

---

### 7. Explicitly Out of Scope
- Message categories
- Lighting effects or glow styles
- User accounts or profiles
- Feeds or rankings
- AI-generated content
