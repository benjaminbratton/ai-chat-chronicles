
import { CelebrityProfile } from '@/components/CelebrityProfile';

const maxTegmarkData = {
  name: "Max Tegmark",
  title: "Professor of Physics, MIT & Co-founder of Future of Humanity Institute",
  location: "MIT, Cambridge, MA",
  joinDate: "January 2024",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  website: "https://tegmark.org",
  biography: "Max Tegmark is a Swedish-American physicist, cosmologist and machine learning researcher. He is a professor at the Massachusetts Institute of Technology and the scientific director of the Foundational Questions Institute. He is also a co-founder of the Future of Humanity Institute and has been a leading voice in discussions about artificial intelligence safety and the future of humanity. His research spans from precision cosmology to the foundations of AI alignment.",
  achievements: [
    "MIT Professor of Physics since 2004",
    "Co-founder Future of Humanity Institute",
    "Author of 'Our Mathematical Universe' and 'Life 3.0'",
    "Leading researcher in AI safety and cosmology"
  ],
  books: [
    {
      title: "Life 3.0: Being Human in the Age of Artificial Intelligence",
      year: "2017",
      description: "Explores how artificial intelligence will affect crime, war, justice, jobs, society and our very sense of being human."
    },
    {
      title: "Our Mathematical Universe",
      year: "2014", 
      description: "A journey to explore the mysteries of the cosmos and our place within it, proposing that our physical reality is a mathematical structure."
    }
  ],
  affiliations: [
    "Massachusetts Institute of Technology",
    "Future of Humanity Institute",
    "Foundational Questions Institute",
    "Center for AI Safety"
  ],
  interests: [
    "AI Safety",
    "Cosmology",
    "Machine Learning",
    "Mathematical Universe Hypothesis",
    "Existential Risk",
    "Consciousness",
    "Physics of Information"
  ],
  stats: {
    conversations: 28,
    totalLikes: 15420,
    totalComments: 3891,
    followers: 47250
  }
};

const maxTegmarkConversations = [
  {
    id: 101,
    title: "The Mathematical Universe Hypothesis and AI Consciousness",
    excerpt: "Exploring whether artificial intelligence could develop consciousness within the framework of my Mathematical Universe Hypothesis, and what this means for the future of intelligence in our cosmos.",
    author: "Max Tegmark",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    readTime: 15,
    publishDate: "2024-01-20",
    category: "AI Safety",
    likes: 892,
    comments: 156
  },
  {
    id: 102,
    title: "AI Alignment: Why We Need to Get It Right the First Time",
    excerpt: "The critical importance of solving AI alignment before achieving artificial general intelligence. Why we might not get a second chance, and what the research community needs to focus on now.",
    author: "Max Tegmark",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    readTime: 22,
    publishDate: "2024-01-15",
    category: "AI Safety",
    likes: 1247,
    comments: 203
  },
  {
    id: 103,
    title: "From Cosmology to AI: Patterns in the Universe",
    excerpt: "How my work in cosmology and precision measurements has informed my thinking about artificial intelligence, information theory, and the fundamental nature of reality.",
    author: "Max Tegmark",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    readTime: 18,
    publishDate: "2024-01-10",
    category: "Physics",
    likes: 734,
    comments: 89
  },
  {
    id: 104,
    title: "Life 3.0: What I Got Right and Wrong About AI's Future",
    excerpt: "Reflecting on my predictions in 'Life 3.0' now that we're seeing rapid advances in AI. What developments surprised me, and what I think we should prepare for next.",
    author: "Max Tegmark",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    readTime: 12,
    publishDate: "2024-01-05",
    category: "Future Studies",
    likes: 1156,
    comments: 278
  }
];

const MaxTegmark = () => {
  return <CelebrityProfile profileData={maxTegmarkData} conversations={maxTegmarkConversations} />;
};

export default MaxTegmark;
