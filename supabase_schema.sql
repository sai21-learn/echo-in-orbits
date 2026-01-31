-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  delivery_date TIMESTAMPTZ NOT NULL,
  position_x FLOAT NOT NULL,
  position_y FLOAT NOT NULL,
  position_z FLOAT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  likes INTEGER DEFAULT 0
);

-- Index for querying by user (optional, good for "my stars")
CREATE INDEX idx_messages_user_id ON messages(user_id);

-- Create likes table for rate limiting (one like per message per user)
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES messages(id) NOT NULL,
  user_identifier TEXT NOT NULL, -- Clerk User ID or LocalStorage UUID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(message_id, user_identifier)
);

-- ✅ COMMENTS FEATURE: Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE NOT NULL,
  user_id TEXT, -- nullable for anonymous
  session_id TEXT, -- for anonymous persistence
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_message_id ON comments(message_id);
