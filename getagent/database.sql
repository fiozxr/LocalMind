-- Enable Row Level Security
-- Note: Requires pg_stat_statements or similar extensions if not already present.

-- Profiles Table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Agents Table
CREATE TABLE public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    compatibility TEXT[] DEFAULT '{}',
    overview_md TEXT,
    payload_md TEXT,
    version TEXT DEFAULT '1.0.0' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, slug)
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles

-- Anyone can read profiles
CREATE POLICY "Public profiles are viewable by everyone."
ON public.profiles FOR SELECT
USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Users can delete own profile
CREATE POLICY "Users can delete own profile."
ON public.profiles FOR DELETE
USING (auth.uid() = id);

-- RLS Policies for agents

-- Anyone can read agents
CREATE POLICY "Agents are viewable by everyone."
ON public.agents FOR SELECT
USING (true);

-- Users can insert their own agents
CREATE POLICY "Users can create their own agents."
ON public.agents FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own agents
CREATE POLICY "Users can update their own agents."
ON public.agents FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own agents
CREATE POLICY "Users can delete their own agents."
ON public.agents FOR DELETE
USING (auth.uid() = user_id);
