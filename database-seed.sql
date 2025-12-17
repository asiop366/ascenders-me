-- Exécute ce SQL dans ton Neon SQL Editor pour avoir des données de test

-- Créer des Spaces (catégories)
INSERT INTO "Space" (id, name, slug, position, "createdAt", "updatedAt")
VALUES 
  ('space_general', 'General', 'general', 0, NOW(), NOW()),
  ('space_build', 'Build Logs', 'build-logs', 1, NOW(), NOW()),
  ('space_guides', 'Guides & Tutorials', 'guides', 2, NOW(), NOW()),
  ('space_feedback', 'Feedback', 'feedback', 3, NOW(), NOW()),
  ('space_offtopic', 'Off-Topic', 'off-topic', 4, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Créer des Channels
INSERT INTO "Channel" (id, "spaceId", name, slug, type, position, "createdAt", "updatedAt")
VALUES 
  -- General space
  ('chan_welcome', 'space_general', 'welcome', 'welcome', 'FORUM', 0, NOW(), NOW()),
  ('chan_announcements', 'space_general', 'announcements', 'announcements', 'FORUM', 1, NOW(), NOW()),
  ('chan_general_disc', 'space_general', 'general-discussion', 'general-discussion', 'FORUM', 2, NOW(), NOW()),
  
  -- Build Logs space
  ('chan_showcase', 'space_build', 'showcase', 'showcase', 'FORUM', 0, NOW(), NOW()),
  ('chan_wip', 'space_build', 'work-in-progress', 'work-in-progress', 'FORUM', 1, NOW(), NOW()),
  
  -- Guides space
  ('chan_tutorials', 'space_guides', 'tutorials', 'tutorials', 'FORUM', 0, NOW(), NOW()),
  ('chan_resources', 'space_guides', 'resources', 'resources', 'FORUM', 1, NOW(), NOW()),
  
  -- Feedback space
  ('chan_suggestions', 'space_feedback', 'suggestions', 'suggestions', 'FORUM', 0, NOW(), NOW()),
  ('chan_bugs', 'space_feedback', 'bug-reports', 'bug-reports', 'FORUM', 1, NOW(), NOW()),
  
  -- Off-Topic space
  ('chan_random', 'space_offtopic', 'random', 'random', 'FORUM', 0, NOW(), NOW()),
  ('chan_gaming', 'space_offtopic', 'gaming', 'gaming', 'FORUM', 1, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Créer un grade gratuit par défaut
INSERT INTO "Grade" (id, name, slug, color, "priceMonthly", position, permissions)
VALUES (
  'grade_free',
  'Free Member',
  'free',
  '#FFFFFF',
  0,
  0,
  '{}'
)
ON CONFLICT (slug) DO NOTHING;

-- Note: Pour créer des threads de test, tu dois d'abord avoir un utilisateur.
-- Après t'être inscrit, tu peux exécuter ce SQL en remplaçant 'TON_USER_ID' par ton vrai ID:

/*
INSERT INTO "Thread" (id, "channelId", "authorId", title, content, pinned, "viewCount", "createdAt", "updatedAt")
VALUES 
  (
    'thread_welcome',
    'chan_welcome',
    'TON_USER_ID',
    'Welcome to Ascenders! 🎉',
    'Welcome to our community! This is a place where you can connect, share, and grow with like-minded individuals. Feel free to introduce yourself and start engaging with other members.',
    true,
    245,
    NOW() - INTERVAL '2 days',
    NOW()
  ),
  (
    'thread_getting_started',
    'chan_general_disc',
    'TON_USER_ID',
    'How to get started with Ascenders?',
    'Here''s a quick guide on how to make the most of our platform:\n\n1. Complete your profile\n2. Join relevant topics\n3. Start or join discussions\n4. Be respectful and follow community guidelines\n\nWhat questions do you have?',
    false,
    128,
    NOW() - INTERVAL '5 hours',
    NOW()
  ),
  (
    'thread_showcase',
    'chan_showcase',
    'TON_USER_ID',
    'My latest project showcase',
    'I''ve been working on this for the past few weeks and finally ready to share! Check out the screenshots and let me know what you think.',
    false,
    89,
    NOW() - INTERVAL '1 day',
    NOW()
  );
*/
