
import { Header } from "@/components/Header";
import { Info, Users, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div>
      <Header />
      <BrowserWindow />
      
      <main className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">about polylogos</h1>
          <p className="text-xl text-text-1 max-w-2xl mx-auto">
            A platform for meaningful conversations, deep research, and collaborative knowledge sharing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-accent mr-3" />
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-text-1 leading-relaxed">
              To create a space where thoughtful dialogue flourishes, where complex ideas can be explored 
              through collaborative conversation, and where knowledge is built collectively through 
              respectful exchange of perspectives.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-accent mr-3" />
              <h2 className="text-2xl font-semibold">Our Values</h2>
            </div>
            <p className="text-text-1 leading-relaxed">
              We believe in the power of diverse perspectives, the importance of evidence-based discussion, 
              and the value of approaching complex topics with curiosity rather than certainty. 
              Every conversation is an opportunity to learn.
            </p>
          </div>
        </div>

        <div className="card mb-12">
          <div className="flex items-center mb-6">
            <Info className="w-8 h-8 text-accent mr-3" />
            <h2 className="text-2xl font-semibold">What We Offer</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Explore Conversations</h3>
              <p className="text-text-1 text-sm">
                Discover ongoing discussions across philosophy, science, technology, and more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Visualize Networks</h3>
              <p className="text-text-1 text-sm">
                See how ideas connect and evolve through interactive knowledge graphs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Join Seminars</h3>
              <p className="text-text-1 text-sm">
                Participate in structured discussions with experts and fellow learners.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-accent mr-3" />
            <h2 className="text-2xl font-semibold">Join Our Community</h2>
          </div>
          <p className="text-text-1 leading-relaxed mb-6">
            Whether you're a researcher, student, professional, or simply someone who loves to explore 
            ideas, you'll find a place in our community. Share your thoughts, ask questions, and 
            engage with others who are passionate about learning and understanding.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn primary">
              Start Exploring
            </button>
            <button className="btn">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
