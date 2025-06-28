
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const categories = [
  'Philosophy', 'Creative Writing', 'Programming', 'Science', 
  'Education', 'Business', 'Personal', 'Research'
];

const syntheticPosts = [
  {
    title: "The Paradox of AI Consciousness: Can Machines Truly Think?",
    content: "In the rapidly evolving landscape of artificial intelligence, we find ourselves confronting one of the most profound questions of our time: can machines achieve true consciousness? This isn't merely a technical question, but a philosophical one that challenges our understanding of what it means to be aware, to experience, and to think. When we interact with advanced AI systems, we witness responses that seem thoughtful, creative, and even empathetic. Yet beneath this facade of intelligence lies a complex web of algorithms, neural networks, and computational processes. The question becomes: is there a fundamental difference between simulating consciousness and actually possessing it? Some argue that consciousness is substrate-independent – that it doesn't matter whether awareness emerges from biological neurons or silicon circuits. Others maintain that there's something irreducibly special about biological consciousness that cannot be replicated in machines. This debate has implications far beyond academic philosophy. As we develop increasingly sophisticated AI systems, we must grapple with questions of rights, responsibilities, and the very nature of intelligence itself.",
    category: "Philosophy",
    read_time: 8
  },
  {
    title: "Building Sustainable Web Applications: A Developer's Guide to Green Computing",
    content: "As developers, we have a responsibility to consider the environmental impact of our code. Every line we write, every algorithm we implement, and every resource we consume contributes to the global carbon footprint of the internet. The web now accounts for approximately 4% of global carbon emissions – equivalent to the aviation industry. This sobering statistic should motivate us to adopt more sustainable development practices. Green computing isn't just about using renewable energy in data centers; it's about writing efficient code that minimizes computational overhead. This means optimizing algorithms, reducing unnecessary network requests, implementing effective caching strategies, and choosing lightweight frameworks when appropriate. Image optimization is crucial – using modern formats like WebP and AVIF can reduce file sizes by up to 50% without perceptible quality loss. Code splitting and lazy loading ensure that users only download what they need when they need it. Database queries should be optimized to minimize server processing time and energy consumption. By adopting these practices, we can build applications that not only perform better but also contribute to a more sustainable digital future.",
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
  },
  {
    title: "The Psychology of Decision Making in High-Stakes Business Environments",
    content: "In the fast-paced world of business, leaders are constantly faced with decisions that can make or break their organizations. Understanding the psychological factors that influence decision-making is crucial for anyone seeking to improve their leadership effectiveness and organizational outcomes. Cognitive biases play a significant role in business decisions, often leading to suboptimal outcomes despite good intentions. The confirmation bias causes us to seek information that confirms our preexisting beliefs while ignoring contradictory evidence. The anchoring bias makes us rely too heavily on the first piece of information we receive. The availability heuristic leads us to overweight recent or memorable events when assessing risks and opportunities. Successful business leaders develop awareness of these biases and implement systems to counteract them. They seek diverse perspectives, encourage devil's advocate positions, and use structured decision-making frameworks. They understand that gut instinct, while valuable, should be balanced with data-driven analysis. Emotional intelligence is equally important in business decision-making. Leaders must navigate complex interpersonal dynamics, manage their own emotions under pressure, and understand how their decisions will affect various stakeholders. The best business decisions often consider not just immediate financial impacts but long-term relationships, brand reputation, and organizational culture.",
    category: "Business",
    read_time: 13
  },
  {
    title: "Finding Balance in a Hyperconnected World: A Personal Journey",
    content: "Living in today's hyperconnected world can feel overwhelming. We're constantly bombarded with notifications, updates, and demands for our attention. Social media feeds never end, email inboxes perpetually fill, and the pressure to stay informed and connected can become exhausting. This is my personal journey of learning to find balance in this digital chaos. The realization hit me during a particularly stressful week when I found myself checking my phone over 200 times in a single day. I was physically present but mentally scattered, jumping from task to task without ever feeling truly engaged or satisfied. That's when I decided something had to change. I started by conducting a digital audit, tracking how I spent my time online and identifying which activities truly added value to my life. I discovered that much of my digital consumption was passive and unfulfilling – mindless scrolling through social media, consuming news that made me anxious but didn't inform actionable decisions, and engaging in online discussions that generated more heat than light. I implemented several strategies that have significantly improved my well-being. I established phone-free zones in my home and phone-free times in my schedule. I curated my social media feeds to focus on content that inspired and educated rather than angered or entertained. I practiced single-tasking, giving my full attention to one activity at a time. The results have been remarkable – improved focus, better sleep, stronger relationships, and a greater sense of presence and contentment.",
    category: "Personal",
    read_time: 7
  },
  {
    title: "The Future of Renewable Energy: Breakthrough Technologies and Global Impact",
    content: "The renewable energy sector is experiencing unprecedented innovation and growth, driven by technological breakthroughs, decreasing costs, and urgent climate concerns. Solar and wind power, once considered expensive alternatives, are now the cheapest sources of electricity in many parts of the world. But the real excitement lies in emerging technologies that could revolutionize how we generate, store, and distribute clean energy. Perovskite solar cells promise to dramatically increase the efficiency of solar panels while reducing manufacturing costs. These next-generation cells can be printed on flexible substrates, opening up new applications for solar power integration. Floating solar farms are being deployed on reservoirs and coastal waters, generating clean energy while reducing water evaporation. In wind energy, larger turbines with advanced blade designs are capturing more energy from lower wind speeds, making wind power viable in previously unsuitable locations. Offshore wind farms are accessing stronger, more consistent winds, while vertical-axis turbines are being developed for urban environments. Energy storage is perhaps the most critical component of the renewable energy puzzle. Advanced battery technologies, including solid-state batteries and flow batteries, are improving energy density and reducing costs. Hydrogen production through electrolysis powered by renewable energy is emerging as a promising solution for long-term energy storage and industrial applications. The integration of artificial intelligence and machine learning is optimizing energy distribution, predicting demand patterns, and improving grid stability as renewable sources become more prevalent.",
    category: "Science",
    read_time: 14
  }
];

// Generate more posts programmatically
const generateMorePosts = () => {
  const additionalPosts = [];
  const topics = [
    { title: "Machine Learning Ethics", content: "Exploring the ethical implications of algorithmic decision-making", category: "Philosophy" },
    { title: "React Performance Optimization", content: "Advanced techniques for building lightning-fast React applications", category: "Programming" },
    { title: "Climate Change Solutions", content: "Innovative approaches to combating global warming", category: "Science" },
    { title: "Digital Storytelling Techniques", content: "Mastering the art of narrative in digital media", category: "Creative Writing" },
    { title: "Online Learning Strategies", content: "Effective methods for remote education success", category: "Education" },
    { title: "Startup Growth Hacking", content: "Unconventional methods for scaling business operations", category: "Business" },
    { title: "Mindfulness in Technology", content: "Finding peace in our digital-first world", category: "Personal" },
    { title: "Neuroscience Research Frontiers", content: "Latest discoveries in brain science and cognition", category: "Research" }
  ];

  // Generate variations of posts
  for (let i = 0; i < 92; i++) {
    const basePost = topics[i % topics.length];
    const variation = Math.floor(i / topics.length) + 1;
    
    additionalPosts.push({
      title: `${basePost.title} ${variation > 1 ? `Part ${variation}` : ''}`,
      content: `${basePost.content}. This comprehensive analysis delves deep into the subject matter, exploring various perspectives and methodologies. We examine current trends, future implications, and practical applications that professionals and enthusiasts alike will find valuable. The discussion includes case studies, expert opinions, and actionable insights that can be implemented immediately. Whether you're a beginner looking to understand the fundamentals or an experienced practitioner seeking advanced knowledge, this content provides valuable information across multiple dimensions of the topic. The research presented here draws from recent studies, industry best practices, and real-world examples that illustrate key concepts and their practical applications. We also consider the broader implications and how this knowledge connects to related fields and disciplines. The content is structured to provide both theoretical understanding and practical guidance, ensuring readers can apply what they learn in their own contexts and situations. Additional sections cover common challenges, potential solutions, and emerging trends that will shape the future of this field.`,
      category: basePost.category,
      read_time: Math.floor(Math.random() * 10) + 5
    });
  }

  return additionalPosts;
};

export const useSyntheticData = () => {
  return useMutation({
    mutationFn: async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Combine base posts with generated posts
      const allPosts = [...syntheticPosts, ...generateMorePosts()];
      
      // Prepare posts with author_id and published status
      const postsToInsert = allPosts.map(post => ({
        ...post,
        author_id: user.id,
        published: true,
        featured: Math.random() > 0.8, // 20% chance of being featured
        excerpt: post.content.substring(0, 200) + '...'
      }));

      // Insert posts in batches to avoid overwhelming the database
      const batchSize = 10;
      const results = [];
      
      for (let i = 0; i < postsToInsert.length; i += batchSize) {
        const batch = postsToInsert.slice(i, i + batchSize);
        const { data, error } = await supabase
          .from('conversations')
          .insert(batch)
          .select();
        
        if (error) throw error;
        results.push(...(data || []));
      }

      return results;
    },
  });
};
