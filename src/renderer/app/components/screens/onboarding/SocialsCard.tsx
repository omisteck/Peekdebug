import React, { useEffect, useState } from 'react';
import {  
  TwitterIcon,
  InstagramIcon,
  GithubIcon,
  Linkedin01Icon,
  GlobeIcon,
  ArrowRight01Icon,
} from 'hugeicons-react';
import Confetti from '../../shared/Confetti';


const SocialsCard = ({ handleNext }: { handleNext: () => void }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const socials = {
    twitter: 'https://x.com/omisteck',
    github: 'https://github.com/omisteck',
    linkedin: 'https://linkedin.com/in/omisteck',
  };

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);


  const handleShare = async () => {
    const tweetText = "🚀 Make Debugging A Joy, Not A Job. 🛠️✨ With Peek, powerful filtering, smart formatting, and real-time monitoring turn chaos into clarity. Spend less time fixing and more time building. 🚀 #PeekApp #DeveloperTools";
    const tweetUrl = "https://peekdebug.com"; // Replace with actual URL
    
    // First try native sharing
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Peek - Make Debugging A Joy",
          text: tweetText,
          url: tweetUrl,
        });
        return;
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }

    // Fallback to Twitter Web Intent
    const encodedText = encodeURIComponent(tweetText);
    const encodedUrl = encodeURIComponent(tweetUrl);
    const twitterIntent = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    window.open(twitterIntent, '_blank', 'noopener,noreferrer');
  };

  const socialIcons: { [key: string]: React.ReactNode } = {
    twitter: <TwitterIcon className="w-6 h-6" />,
    instagram: <InstagramIcon className="w-6 h-6" />,
    github: <GithubIcon className="w-6 h-6" />,
    linkedin: <Linkedin01Icon className="w-6 h-6" />,
    website: <GlobeIcon className="w-6 h-6" />
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-y-auto">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti colors={['#C2EB2C', '#0C2501', '#9BCD1C', '#5C7A01']} />
        </div>
      )}
      
      <div className="w-full max-w-md">
        {/* Header with decorative elements */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-[#C2EB2C]/20 to-[#0C2501]/20 rounded-full blur-xl" />
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#0C2501] to-[#C2EB2C] dark:from-[#C2EB2C] dark:to-[#C2EB2C]/80 bg-clip-text text-transparent">
            Social Links
          </h1>
          <p className="text-lg dark:text-[#C2EB2C]/70 text-[#0C2501]/70">
            Connect with Me
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 dark:bg-darkprimary/95 backdrop-blur-lg rounded-2xl p-8 
          shadow-lg shadow-black/5 dark:shadow-[#C2EB2C]/5
          border border-black/5 dark:border-[#C2EB2C]/10
          transition-all duration-300 relative overflow-hidden">
          
          {/* Profile Section */}
          <div className="relative">
            <div className="flex flex-col items-center space-y-6">

              <div className="text-center space-y-2">
                <p className="text-sm text-[#0C2501]/50 dark:text-[#C2EB2C]/50">
                  Connect with me on social media to stay updated on my latest projects and ideas.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 space-y-3">
              {Object.entries(socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl
                    bg-white/80 dark:bg-darkprimary/95 
                    hover:bg-[#0C2501]/5 dark:hover:bg-[#C2EB2C]/5
                    border border-black/5 dark:border-[#C2EB2C]/10
                    group relative overflow-hidden transition-all duration-300"
                >
                  <span className="flex items-center space-x-4 relative z-10">
                    <span className="text-[#0C2501]/70 dark:text-[#C2EB2C]/70 group-hover:text-[#0C2501] dark:group-hover:text-[#C2EB2C] transition-colors">
                      {socialIcons[platform]}
                    </span>
                    <span className="text-[#0C2501] dark:text-[#C2EB2C] capitalize font-medium">
                      {platform}
                    </span>
                  </span>
                  <span className="relative z-10 text-[#0C2501]/70 dark:text-[#C2EB2C]/70 font-medium
                    group-hover:translate-x-1 transition-transform">
                    Follow →
                  </span>
                </a>
              ))}
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="w-full mt-8 py-3 px-4 rounded-xl font-medium
                relative overflow-hidden group transition-all duration-300
                bg-gradient-to-r from-[#0C2501] to-[#0C2501]/90
                dark:from-[#C2EB2C] dark:to-[#C2EB2C]/90
                text-white dark:text-[#0C2501]
                hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-[#C2EB2C]/20"
            >
              <span className="flex items-center justify-center gap-2">
                Tweet about Peek
                <ArrowRight01Icon className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </button>

            {/* Skip Button */}
            <button
              onClick={handleNext}
              className="w-full mt-4 py-2.5 px-4 rounded-xl font-medium
                relative overflow-hidden group transition-all duration-300
                bg-transparent border border-[#0C2501]/10 dark:border-[#C2EB2C]/10
                text-[#0C2501]/60 dark:text-[#C2EB2C]/60
                hover:bg-[#0C2501]/5 dark:hover:bg-[#C2EB2C]/5
                hover:text-[#0C2501] dark:hover:text-[#C2EB2C]"
            >
              <span className="flex items-center justify-center gap-2">
                Close Onboarding
                <ArrowRight01Icon className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1 opacity-50 group-hover:opacity-100" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialsCard;