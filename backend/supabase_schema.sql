-- ====================================================================
-- ATHENA Database Schema: Behavior, Wellness, Safety, and Lifestyle
-- ====================================================================

-- 1. BEHAVIOR LOGS
CREATE TABLE IF NOT EXISTS public.behavior_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    behavior_type TEXT NOT NULL,
    value TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.behavior_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only access their own behavior logs" ON public.behavior_logs;
CREATE POLICY "Users can only access their own behavior logs"
ON public.behavior_logs
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_behavior_logs_user_id ON public.behavior_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_behavior_logs_created_at ON public.behavior_logs(created_at DESC);


-- 2. WELLNESS LOGS
CREATE TABLE IF NOT EXISTS public.wellness_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    value TEXT,
    unit TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.wellness_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only access their own wellness logs" ON public.wellness_logs;
CREATE POLICY "Users can only access their own wellness logs"
ON public.wellness_logs
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_wellness_logs_user_id ON public.wellness_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_wellness_logs_created_at ON public.wellness_logs(created_at DESC);


-- 3. SAFETY: EMERGENCY CONTACTS
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT,
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only access their own emergency contacts" ON public.emergency_contacts;
CREATE POLICY "Users can only access their own emergency contacts"
ON public.emergency_contacts
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_emergency_contacts_user_id ON public.emergency_contacts(user_id);


-- 4. SAFETY: CONFIGURATION
CREATE TABLE IF NOT EXISTS public.safety_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    sos_enabled BOOLEAN DEFAULT false,
    location_sharing_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.safety_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only access their own safety config" ON public.safety_config;
CREATE POLICY "Users can only access their own safety config"
ON public.safety_config
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_safety_config_user_id ON public.safety_config(user_id);


-- 5. LIFESTYLE PREFERENCES
CREATE TABLE IF NOT EXISTS public.lifestyle_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.lifestyle_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only access their own lifestyle preferences" ON public.lifestyle_preferences;
CREATE POLICY "Users can only access their own lifestyle preferences"
ON public.lifestyle_preferences
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_lifestyle_preferences_user_id ON public.lifestyle_preferences(user_id);
