
import { Header } from "@/components/Header";
import { Info, Users, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 tracking-tight mb-4">About Polylogos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A platform for meaningful conversations, deep research, and collaborative knowledge sharing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To create a space where thoughtful dialogue flourishes, where complex ideas can be explored 
              through collaborative conversation, and where knowledge is built collectively through 
              respectful exchange of perspectives.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Values</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We believe in the power of diverse perspectives, the importance of evidence-based discussion, 
              and the value of approaching complex topics with curiosity rather than certainty. 
              Every conversation is an opportunity to learn.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
          <div className="flex items-center mb-6">
            <Info className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">What We Offer</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Explore Conversations</h3>
              <p className="text-gray-600 text-sm">
                Discover ongoing discussions across philosophy, science, technology, and more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Visualize Networks</h3>
              <p className="text-gray-600 text-sm">
                See how ideas connect and evolve through interactive knowledge graphs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Join Seminars</h3>
              <p className="text-gray-600 text-sm">
                Participate in structured discussions with experts and fellow learners.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Join Our Community</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Whether you're a researcher, student, professional, or simply someone who loves to explore 
            ideas, you'll find a place in our community. Share your thoughts, ask questions, and 
            engage with others who are passionate about learning and understanding.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Philosophy
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Science
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Technology
            </span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              Education
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              Creative Writing
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
