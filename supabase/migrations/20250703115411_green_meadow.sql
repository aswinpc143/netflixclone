/*
  # Initial Schema for Netflix Clone

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `name` (text)
      - `avatar_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `my_list`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `movie_id` (integer, TMDB movie ID)
      - `title` (text)
      - `overview` (text)
      - `poster_path` (text)
      - `backdrop_path` (text)
      - `release_date` (text)
      - `vote_average` (real)
      - `media_type` (text)
      - `created_at` (timestamp)
    
    - `viewing_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `movie_id` (integer, TMDB movie ID)
      - `title` (text)
      - `overview` (text)
      - `poster_path` (text)
      - `backdrop_path` (text)
      - `release_date` (text)
      - `vote_average` (real)
      - `media_type` (text)
      - `progress` (integer, 0-100)
      - `watched_at` (timestamp)
    
    - `user_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `language` (text)
      - `autoplay` (boolean)
      - `notifications` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create my_list table
CREATE TABLE IF NOT EXISTS my_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  movie_id integer NOT NULL,
  title text NOT NULL,
  overview text,
  poster_path text,
  backdrop_path text,
  release_date text,
  vote_average real DEFAULT 0,
  media_type text DEFAULT 'movie',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, movie_id)
);

-- Create viewing_history table
CREATE TABLE IF NOT EXISTS viewing_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  movie_id integer NOT NULL,
  title text NOT NULL,
  overview text,
  poster_path text,
  backdrop_path text,
  release_date text,
  vote_average real DEFAULT 0,
  media_type text DEFAULT 'movie',
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  watched_at timestamptz DEFAULT now()
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  language text DEFAULT 'English',
  autoplay boolean DEFAULT true,
  notifications boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE my_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE viewing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for my_list
CREATE POLICY "Users can read own list"
  ON my_list
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to own list"
  ON my_list
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own list"
  ON my_list
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for viewing_history
CREATE POLICY "Users can read own history"
  ON viewing_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to own history"
  ON viewing_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own history"
  ON viewing_history
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for user_preferences
CREATE POLICY "Users can read own preferences"
  ON user_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_my_list_user_id ON my_list(user_id);
CREATE INDEX IF NOT EXISTS idx_my_list_movie_id ON my_list(movie_id);
CREATE INDEX IF NOT EXISTS idx_viewing_history_user_id ON viewing_history(user_id);
CREATE INDEX IF NOT EXISTS idx_viewing_history_watched_at ON viewing_history(watched_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();