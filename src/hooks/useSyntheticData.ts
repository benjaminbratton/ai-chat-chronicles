
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const categories = [
  'Philosophy', 'Creative Writing', 'Programming', 'Science', 
  'Education', 'Business', 'Personal', 'Research'
];

// Synthetic user data
const syntheticUsers = [
  { username: 'alex_researcher', full_name: 'Alex Chen', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
  { username: 'sophia_writer', full_name: 'Sophia Martinez', avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b332b7ae?w=40&h=40&fit=crop&crop=face' },
  { username: 'mike_coder', full_name: 'Michael Johnson', avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
  { username: 'dr_sarah_k', full_name: 'Dr. Sarah Kim', avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
  { username: 'prof_david', full_name: 'Prof. David Brown', avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face' },
  { username: 'emma_entrepreneur', full_name: 'Emma Wilson', avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face' },
  { username: 'james_philosopher', full_name: 'James Taylor', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
  { username: 'lisa_scientist', full_name: 'Lisa Anderson', avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face' },
  { username: 'tom_teacher', full_name: 'Tom Rodriguez', avatar_url: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face' },
  { username: 'anna_creative', full_name: 'Anna Thompson', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face' },
  { username: 'ryan_dev', full_name: 'Ryan Lee', avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face' },
  { username: 'maria_analyst', full_name: 'Maria Garcia', avatar_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face' },
  { username: 'kevin_innovator', full_name: 'Kevin Chang', avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face' },
  { username: 'rachel_scholar', full_name: 'Rachel White', avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face' },
  { username: 'daniel_thinker', full_name: 'Daniel Smith', avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=40&h=40&fit=crop&crop=face' },
  { username: 'nina_explorer', full_name: 'Nina Patel', avatar_url: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face' },
  { username: 'chris_builder', full_name: 'Chris Murphy', avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face' },
  { username: 'jade_visionary', full_name: 'Jade Liu', avatar_url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop&crop=face' },
  { username: 'marcus_genius', full_name: 'Marcus Johnson', avatar_url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face' },
  { username: 'zoe_futurist', full_name: 'Zoe Adams', avatar_url: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=40&h=40&fit=crop&crop=face' }
];

const syntheticPosts = [
  {
    title: "The Paradox of AI Consciousness: Can Machines Truly Think?",
    content: "In the rapidly evolving landscape of artificial intelligence, we find ourselves confronting one of the most profound questions of our time: can machines achieve true consciousness? This isn't merely a technical question, but a philosophical one that challenges our understanding of what it means to be aware, to experience, and to think. When we interact with advanced AI systems, we witness responses that seem thoughtful, creative, and even empathetic. Yet beneath this facade of intelligence lies a complex web of algorithms, neural networks, and computational processes. The question becomes: is there a fundamental difference between simulating consciousness and actually possessing it? Some argue that consciousness is substrate-independent – that it doesn't matter whether awareness emerges from biological neurons or silicon circuits. Others maintain that there's something irreducibly special about biological consciousness that cannot be replicated in machines. This debate has implications far beyond academic philosophy. As we develop increasingly sophisticated AI systems, we must grapple with questions of rights, responsibilities, and the very nature of intelligence itself. The emergence of large language models has made this question more pressing than ever, as these systems display capabilities that seem to approach human-level understanding in many domains.",
    category: "Philosophy",
    read_time: 8
  },
  {
    title: "Building Sustainable Web Applications: A Developer's Guide to Green Computing",
    content: "As developers, we have a responsibility to consider the environmental impact of our code. Every line we write, every algorithm we implement, and every resource we consume contributes to the global carbon footprint of the internet. The web now accounts for approximately 4% of global carbon emissions – equivalent to the aviation industry. This sobering statistic should motivate us to adopt more sustainable development practices. Green computing isn't just about using renewable energy in data centers; it's about writing efficient code that minimizes computational overhead. This means optimizing algorithms, reducing unnecessary network requests, implementing effective caching strategies, and choosing lightweight frameworks when appropriate. Image optimization is crucial – using modern formats like WebP and AVIF can reduce file sizes by up to 50% without perceptible quality loss. Code splitting and lazy loading ensure that users only download what they need when they need it. Database queries should be optimized to minimize server processing time and energy consumption. By adopting these practices, we can build applications that not only perform better but also contribute to a more sustainable digital future. The JavaScript ecosystem provides numerous tools for monitoring and optimizing performance, from bundle analyzers to lighthouse audits.",
    category: "Programming",
    read_time: 12
  },
  {
    title: "The Quantum Revolution: How Quantum Computing Will Transform Our World",
    content: "Quantum computing represents one of the most significant technological leaps in human history, promising to solve problems that are currently intractable for classical computers. Unlike traditional bits that exist in states of 0 or 1, quantum bits (qubits) can exist in superposition, representing both states simultaneously. This fundamental difference enables quantum computers to process vast amounts of information in parallel, potentially solving certain types of problems exponentially faster than classical computers. The implications are staggering. In cryptography, quantum computers could break current encryption methods, necessitating the development of quantum-resistant security protocols. In drug discovery, they could simulate molecular interactions at unprecedented scales, accelerating the development of new medicines. Climate modeling could become vastly more accurate, helping us better understand and combat climate change. Financial modeling, supply chain optimization, and artificial intelligence could all be revolutionized. However, quantum computing also presents significant challenges. Qubits are extremely fragile and susceptible to environmental interference, requiring near-absolute zero temperatures and sophisticated error correction. The technology is still in its infancy, with most quantum computers requiring highly controlled laboratory conditions. Nevertheless, companies like IBM, Google, and startups worldwide are making rapid progress, suggesting that practical quantum computers may be closer than we think.",
    category: "Science",
    read_time: 10
  },
  {
    title: "The Art of Storytelling in the Digital Age: Crafting Narratives That Resonate",
    content: "In an era of infinite scrolling and shortened attention spans, the art of storytelling has become both more challenging and more crucial than ever. Digital platforms have democratized storytelling, allowing anyone to share their narrative with a global audience. Yet this accessibility has also created an overwhelming sea of content, making it increasingly difficult for individual stories to break through the noise. The fundamentals of good storytelling remain unchanged: compelling characters, engaging conflict, and meaningful resolution. However, the medium through which we tell these stories has evolved dramatically. Social media storytelling requires brevity and immediate impact. Blog posts allow for deeper exploration but must capture attention quickly. Video content combines visual and auditory elements but demands different pacing and structure. Interactive narratives let audiences participate in the story's direction, creating new forms of engagement. The most successful digital storytellers understand that authenticity trumps perfection. Audiences connect with genuine voices and real experiences more than polished but sterile content. They understand their platform's unique characteristics and tailor their storytelling approach accordingly. They also recognize that digital storytelling is often participatory – audiences want to engage, comment, and become part of the narrative themselves.",
    category: "Creative Writing",
    read_time: 9
  },
  {
    title: "Revolutionizing Education Through Personalized Learning Technologies",
    content: "The one-size-fits-all approach to education is rapidly becoming obsolete as we enter an era of personalized learning powered by artificial intelligence and adaptive technologies. Every student learns differently – some are visual learners, others prefer auditory instruction, and still others learn best through hands-on experience. Traditional classroom settings, while valuable for social development, often fail to accommodate these individual differences effectively. Personalized learning technologies are changing this paradigm by adapting to each student's unique learning style, pace, and interests. AI-powered educational platforms can analyze how students interact with content, identifying areas where they struggle and topics that engage them most. This data enables the creation of customized learning paths that optimize both comprehension and retention. Adaptive assessment tools can provide real-time feedback, helping students understand concepts before moving on to more advanced material. Virtual and augmented reality technologies are creating immersive learning experiences that were previously impossible. Students can walk through ancient Rome, manipulate molecular structures, or practice surgical procedures in safe, controlled environments. Gamification elements make learning more engaging, while collaborative platforms connect students with peers and experts worldwide. However, the implementation of personalized learning technologies also raises important questions about data privacy, digital equity, and the role of human teachers in an increasingly automated educational landscape.",
    category: "Education",
    read_time: 11
  }
];

// Generate additional posts programmatically
const generateMorePosts = () => {
  const additionalPosts = [];
  const topics = [
    { title: "Machine Learning Ethics in Healthcare", content: "Exploring the ethical implications of algorithmic decision-making in medical diagnosis and treatment", category: "Philosophy" },
    { title: "React Performance Optimization Techniques", content: "Advanced techniques for building lightning-fast React applications using modern optimization strategies", category: "Programming" },
    { title: "Climate Change and Renewable Energy Solutions", content: "Innovative approaches to combating global warming through sustainable technology and policy", category: "Science" },
    { title: "Digital Storytelling and Interactive Media", content: "Mastering the art of narrative in digital media and interactive experiences", category: "Creative Writing" },
    { title: "Online Learning and Educational Technology", content: "Effective methods for remote education success and digital learning platforms", category: "Education" },
    { title: "Startup Growth and Business Strategy", content: "Unconventional methods for scaling business operations and achieving sustainable growth", category: "Business" },
    { title: "Mindfulness and Digital Wellness", content: "Finding peace and balance in our increasingly digital-first world", category: "Personal" },
    { title: "Neuroscience and Cognitive Research", content: "Latest discoveries in brain science, cognition, and human behavior research", category: "Research" },
    { title: "Blockchain Technology and Decentralization", content: "Understanding the implications of distributed systems and cryptocurrency", category: "Programming" },
    { title: "Space Exploration and Astrophysics", content: "Recent developments in space technology and our understanding of the universe", category: "Science" },
    { title: "Creative Writing in the AI Era", content: "How artificial intelligence is changing the landscape of creative expression", category: "Creative Writing" },
    { title: "Future of Work and Remote Collaboration", content: "Adapting to new work paradigms and building effective distributed teams", category: "Business" }
  ];

  // Generate variations of posts
  for (let i = 0; i < 88; i++) { // Reduced to 88 to make total 100 with base posts
    const basePost = topics[i % topics.length];
    const variation = Math.floor(i / topics.length) + 1;
    
    additionalPosts.push({
      title: `${basePost.title} ${variation > 1 ? `- Part ${variation}` : ''}`,
      content: `${basePost.content}. This comprehensive analysis delves deep into the subject matter, exploring various perspectives and methodologies that professionals and researchers have developed over recent years. We examine current trends, future implications, and practical applications that both beginners and experienced practitioners will find valuable and actionable.`,
      category: basePost.category,
      read_time: Math.floor(Math.random() * 10) + 5
    });
  }

  return additionalPosts;
};

export const useSyntheticData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      console.log('🚀 Starting synthetic data generation...');
      
      // Get current user first
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('❌ Error getting user:', userError);
        throw new Error('Failed to get user: ' + userError.message);
      }
      
      if (!user) {
        console.error('❌ No authenticated user found');
        throw new Error('User not authenticated - please log in first');
      }

      console.log('✅ User authenticated:', user.id);

      // Test database connection first
      console.log('🔍 Testing database connection...');
      const { data: testData, error: testError } = await supabase
        .from('conversations')
        .select('count')
        .limit(1);
      
      if (testError) {
        console.error('❌ Database connection failed:', testError);
        throw new Error('Database connection failed: ' + testError.message);
      }
      
      console.log('✅ Database connection successful');

      // First, create synthetic user profiles if they don't exist
      console.log('👥 Creating synthetic user profiles...');
      const syntheticProfiles = [];
      
      for (const syntheticUser of syntheticUsers) {
        // Check if profile already exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', syntheticUser.username)
          .single();
        
        if (!existingProfile) {
          // Create new synthetic user profile
          const { data: newProfile, error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: crypto.randomUUID(), // Generate a random UUID for synthetic users
              username: syntheticUser.username,
              full_name: syntheticUser.full_name,
              avatar_url: syntheticUser.avatar_url,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select('id')
            .single();
          
          if (profileError) {
            console.error('❌ Error creating synthetic profile:', profileError);
            // Continue with other profiles even if one fails
          } else {
            syntheticProfiles.push(newProfile);
            console.log(`✅ Created profile for ${syntheticUser.username}`);
          }
        } else {
          syntheticProfiles.push(existingProfile);
          console.log(`✅ Profile already exists for ${syntheticUser.username}`);
        }
      }

      // Get all synthetic profile IDs for assigning to posts
      const { data: allSyntheticProfiles, error: fetchError } = await supabase
        .from('profiles')
        .select('id, username')
        .in('username', syntheticUsers.map(u => u.username));
      
      if (fetchError) {
        console.error('❌ Error fetching synthetic profiles:', fetchError);
        throw new Error('Failed to fetch synthetic profiles: ' + fetchError.message);
      }

      // Combine base posts with generated posts
      const allPosts = [...syntheticPosts, ...generateMorePosts()];
      console.log(`📝 Generated ${allPosts.length} posts total`);
      
      // Prepare posts with random synthetic authors
      const postsToInsert = allPosts.map((post, index) => {
        // Assign a random synthetic user to each post
        const randomProfile = allSyntheticProfiles[index % allSyntheticProfiles.length];
        
        const postData = {
          title: post.title,
          content: post.content,
          excerpt: post.content.substring(0, 200) + '...',
          author_id: randomProfile.id, // Use synthetic user ID instead of current user
          category: post.category,
          read_time: post.read_time,
          published: true,
          featured: Math.random() > 0.8, // 20% chance of being featured
          created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        };
        
        console.log(`📄 Post ${index + 1}: "${postData.title}" - Author: ${randomProfile.username} - Category: ${postData.category}`);
        return postData;
      });

      console.log('💾 Starting database insertion...');

      // Insert posts in smaller batches to avoid issues
      const batchSize = 5;
      const results = [];
      
      for (let i = 0; i < postsToInsert.length; i += batchSize) {
        const batch = postsToInsert.slice(i, i + batchSize);
        const batchNumber = Math.floor(i/batchSize) + 1;
        const totalBatches = Math.ceil(postsToInsert.length/batchSize);
        
        console.log(`🔄 Inserting batch ${batchNumber}/${totalBatches} (${batch.length} posts)...`);
        
        const { data, error } = await supabase
          .from('conversations')
          .insert(batch)
          .select('id, title, category, published');
        
        if (error) {
          console.error(`❌ Error inserting batch ${batchNumber}:`, error);
          throw new Error(`Failed to insert batch ${batchNumber}: ${error.message}`);
        }
        
        if (!data || data.length === 0) {
          console.error(`❌ No data returned for batch ${batchNumber}`);
          throw new Error(`No data returned for batch ${batchNumber}`);
        }
        
        console.log(`✅ Batch ${batchNumber} inserted successfully:`, data.length, 'posts');
        results.push(...data);
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      console.log(`🎉 All posts inserted successfully! Total: ${results.length}`);
      
      // Verify the data was inserted
      const { data: verifyData, error: verifyError } = await supabase
        .from('conversations')
        .select('count')
        .in('author_id', allSyntheticProfiles.map(p => p.id));
        
      if (verifyError) {
        console.error('❌ Error verifying data:', verifyError);
      } else {
        console.log('🔍 Verification - Total synthetic conversations in DB:', verifyData);
      }
      
      return results;
    },
    onSuccess: (data) => {
      console.log('🔄 Invalidating queries to refresh data...');
      // Invalidate all related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['featured-conversations'] });
      queryClient.invalidateQueries({ queryKey: ['visualization-data'] });
      console.log('✅ Cache invalidated, data should refresh automatically');
    },
    onError: (error) => {
      console.error('💥 Synthetic data generation failed:', error);
    }
  });
};
