
import { Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://twitter.com/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://substack.com/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com/company/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://wechat.com/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-500 transition-colors"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M5 2C3.343 2 2 3.343 2 5v14c0 1.657 1.343 3 3 3h14c1.657 0 3-1.343 3-3V5c0-1.657-1.343-3-3-3H5zm3.5 6c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .4-1 1-1zm3 0c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .4-1 1-1zM7 12.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5S12.3 14 11.5 14h-3c-.8 0-1.5-.7-1.5-1.5zm7.5-4.5c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .4-1 1-1zm2.5 0c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .4-1 1-1zm-3 4.5c0-.8.7-1.5 1.5-1.5h2c.8 0 1.5.7 1.5 1.5S18.3 14 17.5 14h-2c-.8 0-1.5-.7-1.5-1.5z"/>
              </svg>
            </a>
            <a 
              href="https://discord.gg/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-500 transition-colors"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
              </svg>
            </a>
            <a 
              href="https://line.me/ti/g2/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-400 transition-colors"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.630v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2024 Polylogos. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
