
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { FeaturedConversation } from "@/components/FeaturedConversation";
import { ConversationCard } from "@/components/ConversationCard";
import { CategoryFilter } from "@/components/CategoryFilter";

const mockConversations = [
  {
    id: 1,
    title: "Exploring the Philosophy of Consciousness with GPT-4",
    excerpt: "A deep dive into what it means to be conscious, examining the hard problem of consciousness through the lens of artificial intelligence. This conversation explores fundamental questions about subjective experience, qualia, and the nature of awareness itself. We delve into philosophical frameworks from Chalmers to Dennett, questioning whether machines can truly experience consciousness or merely simulate it convincingly...",
    author: "Dr. Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-01-15",
    category: "Philosophy",
    likes: 142,
    comments: 23,
    featured: true
  },
  {
    id: 2,
    title: "Claude's Take on Creative Writing Techniques",
    excerpt: "Discovering unexpected insights about narrative structure and character development through AI collaboration...",
    author: "Marcus Rivera",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    readTime: 5,
    publishDate: "2024-01-14",
    category: "Creative Writing",
    likes: 89,
    comments: 12,
    featured: false
  },
  {
    id: 3,
    title: "Debugging Complex Code with AI: A Developer's Journey",
    excerpt: "How AI assistance transformed my approach to solving challenging programming problems and improved my coding workflow...",
    author: "Alex Thompson",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    readTime: 12,
    publishDate: "2024-01-13",
    category: "Programming",
    likes: 234,
    comments: 45,
    featured: false
  },
  {
    id: 4,
    title: "AI and the Future of Scientific Discovery",
    excerpt: "Exploring how conversations with AI models are accelerating hypothesis generation and research methodologies...",
    author: "Dr. Emily Watson",
    authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-01-12",
    category: "Science",
    likes: 156,
    comments: 31,
    featured: false
  },
  {
    id: 5,
    title: "Teaching Kids Programming Through AI Conversations",
    excerpt: "How AI tutoring is revolutionizing computer science education and making programming accessible to young learners...",
    author: "Jennifer Liu",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    readTime: 7,
    publishDate: "2024-01-11",
    category: "Education",
    likes: 98,
    comments: 18,
    featured: false
  },
  {
    id: 7,
    title: "The Ethics of AI Decision Making",
    excerpt: "A comprehensive dialogue exploring moral frameworks for artificial intelligence and algorithmic accountability...",
    author: "Dr. Robert Kim",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-01-10",
    category: "Philosophy",
    likes: 167,
    comments: 28,
    featured: false
  },
  {
    id: 8,
    title: "Building Interactive Stories with ChatGPT",
    excerpt: "Exploring collaborative storytelling techniques and character development through AI-human creative partnerships...",
    author: "Luna Martinez",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    readTime: 6,
    publishDate: "2024-01-09",
    category: "Creative Writing",
    likes: 124,
    comments: 15,
    featured: false
  },
  {
    id: 9,
    title: "Machine Learning Model Optimization Strategies",
    excerpt: "Deep dive into hyperparameter tuning and architectural decisions through collaborative AI problem-solving...",
    author: "David Park",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    readTime: 14,
    publishDate: "2024-01-08",
    category: "Programming",
    likes: 201,
    comments: 52,
    featured: false
  },
  {
    id: 10,
    title: "Climate Science and AI Modeling",
    excerpt: "How artificial intelligence is helping researchers understand complex climate patterns and predict environmental changes...",
    author: "Dr. Maria Santos",
    authorImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
    readTime: 11,
    publishDate: "2024-01-07",
    category: "Science",
    likes: 178,
    comments: 34,
    featured: false
  },
  {
    id: 11,
    title: "Personalized Learning with AI Tutors",
    excerpt: "Examining how artificial intelligence adapts to individual learning styles and creates customized educational experiences...",
    author: "Professor James Wilson",
    authorImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-01-06",
    category: "Education",
    likes: 143,
    comments: 21,
    featured: false
  },
  {
    id: 12,
    title: "AI in Business Strategy and Decision Making",
    excerpt: "How executives are leveraging AI conversations to analyze market trends and develop strategic initiatives...",
    author: "Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1594736797933-d0d00f23a26c?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-01-05",
    category: "Business",
    likes: 189,
    comments: 41,
    featured: false
  },
  {
    id: 13,
    title: "Personal Growth Through AI Reflection",
    excerpt: "Using AI as a mirror for self-discovery and personal development through thoughtful dialogue and introspection...",
    author: "Michael Chen",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    readTime: 7,
    publishDate: "2024-01-04",
    category: "Personal",
    likes: 112,
    comments: 19,
    featured: false
  },
  {
    id: 14,
    title: "The Nature of Language and Communication",
    excerpt: "Philosophical exploration of how AI and humans understand and generate language, questioning the nature of meaning itself...",
    author: "Dr. Elena Rodriguez",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    readTime: 13,
    publishDate: "2024-01-03",
    category: "Philosophy",
    likes: 156,
    comments: 29,
    featured: false
  },
  {
    id: 15,
    title: "Poetry Generation and Literary Analysis",
    excerpt: "Collaborative exploration of poetic forms, metaphor creation, and literary interpretation with AI assistance...",
    author: "Amanda Foster",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-01-02",
    category: "Creative Writing",
    likes: 94,
    comments: 16,
    featured: false
  },
  // Additional Philosophy entries
  {
    id: 16,
    title: "Free Will and Determinism in AI Systems",
    excerpt: "Examining whether artificial intelligence can possess genuine agency or if all decisions are predetermined by algorithms...",
    author: "Dr. Philosophy Expert",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    readTime: 11,
    publishDate: "2024-01-20",
    category: "Philosophy",
    likes: 145,
    comments: 32,
    featured: false
  },
  {
    id: 17,
    title: "Mind-Body Problem Through AI Lens",
    excerpt: "Exploring dualism and physicalism as they relate to artificial consciousness and embodied cognition...",
    author: "Prof. Mind Studies",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-01-19",
    category: "Philosophy",
    likes: 133,
    comments: 27,
    featured: false
  },
  {
    id: 18,
    title: "Existentialism and AI Authenticity",
    excerpt: "Can artificial intelligence experience authentic existence, or are they forever trapped in bad faith?...",
    author: "Dr. Existential AI",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    readTime: 12,
    publishDate: "2024-01-18",
    category: "Philosophy",
    likes: 167,
    comments: 41,
    featured: false
  },
  {
    id: 19,
    title: "Epistemology of Machine Learning",
    excerpt: "How do AI systems acquire knowledge, and what can this tell us about human understanding?...",
    author: "Dr. Knowledge Theory",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-01-17",
    category: "Philosophy",
    likes: 198,
    comments: 35,
    featured: false
  },
  {
    id: 20,
    title: "Moral Philosophy in AI Decision Trees",
    excerpt: "Analyzing utilitarian, deontological, and virtue ethics frameworks within algorithmic decision-making processes...",
    author: "Prof. Ethics AI",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    readTime: 14,
    publishDate: "2024-01-16",
    category: "Philosophy",
    likes: 176,
    comments: 48,
    featured: false
  },
  // Additional Creative Writing entries
  {
    id: 21,
    title: "Worldbuilding with AI: Creating Fictional Universes",
    excerpt: "How AI collaboration can help develop rich, consistent fictional worlds with deep lore and history...",
    author: "Fantasy Writer Pro",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-01-25",
    category: "Creative Writing",
    likes: 156,
    comments: 22,
    featured: false
  },
  {
    id: 22,
    title: "Dialogue Writing Techniques with ChatGPT",
    excerpt: "Mastering realistic conversation flow and character voice through AI-assisted writing exercises...",
    author: "Dialogue Master",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    readTime: 6,
    publishDate: "2024-01-24",
    category: "Creative Writing",
    likes: 134,
    comments: 18,
    featured: false
  },
  {
    id: 23,
    title: "Screenplay Structure Through AI Analysis",
    excerpt: "Breaking down three-act structure and character arcs using artificial intelligence as a writing partner...",
    author: "Screen Writer",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    readTime: 11,
    publishDate: "2024-01-23",
    category: "Creative Writing",
    likes: 187,
    comments: 31,
    featured: false
  },
  {
    id: 24,
    title: "Genre Fiction Tropes and AI Innovation",
    excerpt: "Exploring how AI can help subvert common tropes while maintaining genre expectations...",
    author: "Genre Expert",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-01-22",
    category: "Creative Writing",
    likes: 143,
    comments: 26,
    featured: false
  },
  {
    id: 25,
    title: "Character Development Through AI Roleplay",
    excerpt: "Using AI to explore character motivations, backstories, and psychological depth in fiction...",
    author: "Character Creator",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    readTime: 7,
    publishDate: "2024-01-21",
    category: "Creative Writing",
    likes: 165,
    comments: 29,
    featured: false
  },
  // Additional Programming entries
  {
    id: 26,
    title: "Advanced React Patterns with AI Assistance",
    excerpt: "Exploring complex React patterns and custom hooks through collaborative AI programming sessions...",
    author: "React Specialist",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    readTime: 15,
    publishDate: "2024-01-30",
    category: "Programming",
    likes: 234,
    comments: 56,
    featured: false
  },
  {
    id: 27,
    title: "Database Design Through AI Consultation",
    excerpt: "Optimizing database schemas and query performance with AI-guided architectural decisions...",
    author: "DB Architect",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    readTime: 13,
    publishDate: "2024-01-29",
    category: "Programming",
    likes: 198,
    comments: 43,
    featured: false
  },
  {
    id: 28,
    title: "API Design Best Practices with AI",
    excerpt: "Creating robust, scalable APIs through AI-assisted design patterns and documentation strategies...",
    author: "API Designer",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-01-28",
    category: "Programming",
    likes: 176,
    comments: 38,
    featured: false
  },
  {
    id: 29,
    title: "Testing Strategies with AI Code Review",
    excerpt: "Implementing comprehensive testing suites and code quality checks through AI collaboration...",
    author: "Test Engineer",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    readTime: 12,
    publishDate: "2024-01-27",
    category: "Programming",
    likes: 145,
    comments: 32,
    featured: false
  },
  {
    id: 30,
    title: "Microservices Architecture with AI Planning",
    excerpt: "Designing and implementing microservices systems through AI-guided architectural planning...",
    author: "System Architect",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    readTime: 16,
    publishDate: "2024-01-26",
    category: "Programming",
    likes: 267,
    comments: 61,
    featured: false
  },
  // Additional Science entries
  {
    id: 31,
    title: "Quantum Computing Applications in AI",
    excerpt: "Exploring the intersection of quantum mechanics and artificial intelligence for next-generation computing...",
    author: "Dr. Quantum AI",
    authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    readTime: 14,
    publishDate: "2024-02-05",
    category: "Science",
    likes: 223,
    comments: 47,
    featured: false
  },
  {
    id: 32,
    title: "Neuroscience and Machine Learning Convergence",
    excerpt: "How brain research is informing AI development and vice versa in cognitive science...",
    author: "Dr. Neuro Science",
    authorImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
    readTime: 11,
    publishDate: "2024-02-04",
    category: "Science",
    likes: 189,
    comments: 39,
    featured: false
  },
  {
    id: 33,
    title: "Biotechnology and AI Drug Discovery",
    excerpt: "Accelerating pharmaceutical research through AI-driven molecular analysis and drug design...",
    author: "Dr. Bio Tech",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    readTime: 13,
    publishDate: "2024-02-03",
    category: "Science",
    likes: 201,
    comments: 44,
    featured: false
  },
  {
    id: 34,
    title: "Astrophysics Data Analysis with AI",
    excerpt: "Using machine learning to process astronomical data and discover new celestial phenomena...",
    author: "Dr. Astro Physics",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    readTime: 12,
    publishDate: "2024-02-02",
    category: "Science",
    likes: 178,
    comments: 35,
    featured: false
  },
  {
    id: 35,
    title: "Environmental Monitoring Through AI Systems",
    excerpt: "Deploying artificial intelligence for real-time environmental data collection and analysis...",
    author: "Dr. Environment",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-02-01",
    category: "Science",
    likes: 165,
    comments: 41,
    featured: false
  },
  // Additional Education entries
  {
    id: 36,
    title: "AI-Powered Language Learning Platforms",
    excerpt: "Revolutionary approaches to foreign language acquisition through personalized AI tutoring systems...",
    author: "Dr. Language Ed",
    authorImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-02-10",
    category: "Education",
    likes: 156,
    comments: 28,
    featured: false
  },
  {
    id: 37,
    title: "Mathematics Education Through AI Visualization",
    excerpt: "Making complex mathematical concepts accessible through AI-generated visual explanations...",
    author: "Prof. Math Ed",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-02-09",
    category: "Education",
    likes: 143,
    comments: 24,
    featured: false
  },
  {
    id: 38,
    title: "Special Needs Education and AI Adaptation",
    excerpt: "Customizing learning experiences for students with diverse learning needs through intelligent systems...",
    author: "Dr. Special Ed",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    readTime: 11,
    publishDate: "2024-02-08",
    category: "Education",
    likes: 187,
    comments: 36,
    featured: false
  },
  {
    id: 39,
    title: "AI Assessment and Grading Systems",
    excerpt: "Developing fair and comprehensive evaluation methods through automated assessment technologies...",
    author: "Assessment Expert",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-02-07",
    category: "Education",
    likes: 134,
    comments: 31,
    featured: false
  },
  {
    id: 40,
    title: "Virtual Reality Classrooms with AI Teachers",
    excerpt: "Immersive educational experiences combining VR environments with intelligent tutoring systems...",
    author: "VR Education",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    readTime: 12,
    publishDate: "2024-02-06",
    category: "Education",
    likes: 198,
    comments: 45,
    featured: false
  },
  // Additional Business entries
  {
    id: 41,
    title: "AI-Driven Market Research and Analysis",
    excerpt: "Leveraging artificial intelligence for comprehensive market insights and competitive analysis...",
    author: "Market Analyst",
    authorImage: "https://images.unsplash.com/photo-1594736797933-d0d00f23a26c?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-02-15",
    category: "Business",
    likes: 167,
    comments: 33,
    featured: false
  },
  {
    id: 42,
    title: "Customer Service Automation with AI",
    excerpt: "Implementing intelligent chatbots and support systems to enhance customer experience...",
    author: "CX Specialist",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-02-14",
    category: "Business",
    likes: 145,
    comments: 27,
    featured: false
  },
  {
    id: 43,
    title: "Supply Chain Optimization Through AI",
    excerpt: "Using predictive analytics and machine learning to streamline global supply chain operations...",
    author: "Supply Chain Pro",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    readTime: 11,
    publishDate: "2024-02-13",
    category: "Business",
    likes: 178,
    comments: 38,
    featured: false
  },
  {
    id: 44,
    title: "Financial Forecasting with Machine Learning",
    excerpt: "Advanced predictive models for financial planning and risk assessment in modern business...",
    author: "Finance AI Expert",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    readTime: 13,
    publishDate: "2024-02-12",
    category: "Business",
    likes: 201,
    comments: 42,
    featured: false
  },
  {
    id: 45,
    title: "HR Analytics and AI Recruitment",
    excerpt: "Transforming human resources through intelligent candidate screening and employee analytics...",
    author: "HR Innovation",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-02-11",
    category: "Business",
    likes: 156,
    comments: 35,
    featured: false
  },
  // Additional Personal entries
  {
    id: 46,
    title: "AI-Assisted Meditation and Mindfulness",
    excerpt: "Personal growth through AI-guided meditation practices and mindfulness training programs...",
    author: "Mindfulness Coach",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    readTime: 7,
    publishDate: "2024-02-20",
    category: "Personal",
    likes: 134,
    comments: 26,
    featured: false
  },
  {
    id: 47,
    title: "Life Coaching Through AI Conversations",
    excerpt: "Exploring personal development goals and strategies through structured AI coaching sessions...",
    author: "Life Coach AI",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-02-19",
    category: "Personal",
    likes: 167,
    comments: 31,
    featured: false
  },
  {
    id: 48,
    title: "AI-Powered Habit Formation and Tracking",
    excerpt: "Building sustainable habits through intelligent tracking systems and personalized motivation...",
    author: "Habit Expert",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-02-18",
    category: "Personal",
    likes: 145,
    comments: 28,
    featured: false
  },
  {
    id: 49,
    title: "Career Development Planning with AI",
    excerpt: "Strategic career planning and skill development guidance through AI-assisted analysis...",
    author: "Career Advisor",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    readTime: 11,
    publishDate: "2024-02-17",
    category: "Personal",
    likes: 189,
    comments: 37,
    featured: false
  },
  {
    id: 50,
    title: "Digital Wellness and AI Balance",
    excerpt: "Managing technology use and digital wellness through mindful AI integration practices...",
    author: "Digital Wellness",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    readTime: 6,
    publishDate: "2024-02-16",
    category: "Personal",
    likes: 123,
    comments: 22,
    featured: false
  },
  // Additional Research entries
  {
    id: 51,
    title: "Meta-Analysis of AI Research Methodologies",
    excerpt: "Comprehensive review of research approaches in artificial intelligence and their effectiveness...",
    author: "Dr. Research Methods",
    authorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    readTime: 18,
    publishDate: "2024-02-25",
    category: "Research",
    likes: 234,
    comments: 52,
    featured: false
  },
  {
    id: 52,
    title: "Longitudinal Studies on AI Impact",
    excerpt: "Long-term research tracking the societal effects of artificial intelligence adoption...",
    author: "Dr. Longitudinal",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    readTime: 16,
    publishDate: "2024-02-24",
    category: "Research",
    likes: 198,
    comments: 45,
    featured: false
  },
  {
    id: 53,
    title: "Cross-Cultural AI Interaction Studies",
    excerpt: "Research on how different cultures interact with and perceive artificial intelligence systems...",
    author: "Dr. Cultural AI",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    readTime: 14,
    publishDate: "2024-02-23",
    category: "Research",
    likes: 176,
    comments: 39,
    featured: false
  },
  {
    id: 54,
    title: "Ethical AI Development Frameworks",
    excerpt: "Research-based approaches to developing ethical guidelines for AI system development...",
    author: "Dr. AI Ethics",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    readTime: 15,
    publishDate: "2024-02-22",
    category: "Research",
    likes: 167,
    comments: 41,
    featured: false
  },
  {
    id: 55,
    title: "Interdisciplinary AI Research Collaborations",
    excerpt: "Exploring successful models for cross-disciplinary research in artificial intelligence fields...",
    author: "Dr. Interdisciplinary",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    readTime: 13,
    publishDate: "2024-02-21",
    category: "Research",
    likes: 145,
    comments: 33,
    featured: false
  }
];

const featuredResearch = {
  id: 6,
  title: "Artificial Evolution in Context",
  excerpt: "Comprehensive analysis of evolutionary algorithms and their applications in modern AI systems, exploring how computational evolution mirrors biological processes and drives innovation in machine learning architectures. This research examines the fundamental principles of genetic algorithms, evolutionary strategies, and their role in optimizing neural network architectures and hyperparameters...",
  author: "Dr. Michael Harrison",
  authorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
  readTime: 15,
  publishDate: "2024-01-16",
  category: "Research",
  likes: 87,
  comments: 19,
  featured: true,
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayCount, setDisplayCount] = useState(9);
  
  const featuredConversation = {
    ...mockConversations.find(conv => conv.featured),
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop"
  };
  const regularConversations = mockConversations.filter(conv => !conv.featured);
  
  // Updated filtering logic
  const getFilteredConversations = () => {
    if (selectedCategory === "All") {
      // Return a random mix of 10 entries from all categories
      const shuffled = [...regularConversations].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10);
    } else {
      // Return up to 10 entries from the selected category
      const categoryConversations = regularConversations.filter(conv => conv.category === selectedCategory);
      return categoryConversations.slice(0, 10);
    }
  };

  const filteredConversations = getFilteredConversations();
  const displayedConversations = filteredConversations.slice(0, displayCount);
  const hasMore = filteredConversations.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 9, filteredConversations.length));
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Site Explanation */}
        <div className="mb-16 text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
            Polylogos is a forum for the socialization and analysis of human-machine communication, 
            and thereby a way for collective intelligence crossing the boundary between the two 
            to understand itself as it emerges.
          </p>
        </div>

        {/* Hero Section - Two Column Layout */}
        <div className="mb-16 grid md:grid-cols-2 gap-16">
          {/* Left Column - Dialogues with AI */}
          <div>
            <h1 className="text-4xl md:text-6xl font-thin text-green-800 mb-6 tracking-tight">
              Dialogues with AI
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-thin">
              Discover and share fascinating conversations with artificial intelligence. 
              Join our community of AI enthusiasts exploring the future of human-machine dialogue.{" "}
              <Link to="/explore" className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>

          {/* Right Column - Deep Research */}
          <div className="text-right">
            <h1 className="text-4xl md:text-6xl font-thin text-blue-800 mb-6 tracking-tight">
              Deep Research
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-thin">
              Share comprehensive research reports and in-depth analyses. 
              Engage with scholarly work and contribute to meaningful academic discussions through collaborative commentary.{" "}
              <Link to="/explore" className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>

        {/* Featured Section - Two Column Layout with Equal Heights */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Left - Featured Dialogue */}
            <div className="flex flex-col">
              <h3 className="text-sm font-thin text-gray-600 mb-4 uppercase tracking-wider">Featured Dialogue</h3>
              <div className="flex-1">
                {featuredConversation && (
                  <FeaturedConversation conversation={featuredConversation} bgColor="bg-green-50" />
                )}
              </div>
            </div>
            
            {/* Right - Featured Deep Research */}
            <div className="flex flex-col">
              <h3 className="text-sm font-thin text-gray-600 mb-4 uppercase tracking-wider">Featured Deep Research</h3>
              <div className="flex-1">
                <FeaturedConversation conversation={featuredResearch} bgColor="bg-blue-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setDisplayCount(9); // Reset display count when changing categories
          }}
        />

        {/* Conversations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedConversations.map((conversation) => (
            <ConversationCard key={conversation.id} conversation={conversation} />
          ))}
        </div>

        {/* Load More / See More */}
        {hasMore && (
          <div className="text-center">
            <button 
              onClick={handleLoadMore}
              className="bg-black text-white px-8 py-3 font-thin text-sm tracking-wide uppercase hover:bg-gray-800 transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
