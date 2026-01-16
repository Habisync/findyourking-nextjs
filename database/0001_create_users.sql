-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  bio TEXT,
  image_url TEXT,
  location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  gender TEXT CHECK (gender IN ('male', 'female', 'non-binary', 'other')),
  looking_for TEXT CHECK (looking_for IN ('male', 'female', 'everyone')),
  interests TEXT[],
  height INTEGER,
  ethnicity TEXT,
  body_type TEXT,
  relationship_status TEXT CHECK (relationship_status IN ('single', 'divorced', 'widowed', 'complicated')),
  education TEXT,
  occupation TEXT,
  company TEXT,
  school TEXT,
  about_me TEXT,
  instagram TEXT,
  spotify TEXT,
  show_me_men BOOLEAN DEFAULT true,
  show_me_women BOOLEAN DEFAULT true,
  distance_preference INTEGER DEFAULT 50,
  age_preference_min INTEGER DEFAULT 18,
  age_preference_max INTEGER DEFAULT 99,
  verified BOOLEAN DEFAULT false,
  premium BOOLEAN DEFAULT false,
  online BOOLEAN DEFAULT false,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create indexes
CREATE INDEX idx_users_location ON users(latitude, longitude);
CREATE INDEX idx_users_gender ON users(gender);
CREATE INDEX idx_users_online ON users(online);
CREATE INDEX idx_users_premium ON users(premium);
