
-- Add tags column to conversations table
ALTER TABLE public.conversations 
ADD COLUMN tags TEXT[] DEFAULT '{}';

-- Update existing conversations to have tags based on their category
UPDATE public.conversations 
SET tags = ARRAY[category] 
WHERE tags = '{}' OR tags IS NULL;

-- Create index for better performance on tag queries
CREATE INDEX idx_conversations_tags ON public.conversations USING GIN (tags);
