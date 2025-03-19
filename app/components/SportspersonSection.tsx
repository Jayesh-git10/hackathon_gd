'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Sportsperson {
  id: number;
  name: string;
  sport: string;
  achievements: string[];
  imageUrl: string;
  bgColor: string;
  quote: string;
  dietTip: string;
}

const sportsPersonalities: Sportsperson[] = [
  {
    id: 1,
    name: "Sachin Tendulkar",
    sport: "Cricket",
    achievements: [
      "Highest run-scorer in international cricket",
      "First player to score 100 international centuries",
      "Only player with 200+ appearances in Test matches",
      "Bharat Ratna (India's highest civilian award)"
    ],
    imageUrl: "/images/sachin_image.jpg",
    bgColor: "from-blue-600 to-blue-800",
    quote: "I always had a dream to play for India, but I never let it put pressure on me.",
    dietTip: "Consistency in your diet is just as important as consistency in your training. I've always focused on balanced nutrition to fuel my performance."
  },
  {
    id: 2,
    name: "Virat Kohli",
    sport: "Cricket",
    achievements: [
      "Fastest to reach 10,000 ODI runs",
      "Most runs in a single IPL season",
      "ICC Cricketer of the Year",
      "Most centuries in ODI run chases"
    ],
    imageUrl: "/images/virat_image.avif",
    bgColor: "from-blue-500 to-blue-700",
    quote: "Self-belief and hard work will always earn you success.",
    dietTip: "I've completely changed my diet to plant-based foods. It's made me feel stronger and more energetic on the field."
  },
  {
    id: 3,
    name: "Cristiano Ronaldo",
    sport: "Football",
    achievements: [
      "5× UEFA Champions League winner",
      "5× Ballon d'Or winner",
      "Most international goals in football history",
      "Most Champions League goals"
    ],
    imageUrl: "/images/Ronaldo_image.jpg",
    bgColor: "from-red-500 to-red-700",
    quote: "Your love makes me strong, your hate makes me unstoppable.",
    dietTip: "I eat six small meals a day and avoid sugary foods. Proper hydration is key to maintaining peak performance."
  },
  {
    id: 4,
    name: "Lionel Messi",
    sport: "Football",
    achievements: [
      "FIFA World Cup Winner 2022",
      "7× Ballon d'Or winner",
      "Most goals in La Liga history",
      "Olympic Gold Medalist"
    ],
    imageUrl: "/images/messi_image.webp",
    bgColor: "from-sky-500 to-sky-700",
    quote: "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
    dietTip: "I follow a Mediterranean diet rich in whole grains, lean proteins, and healthy fats. It keeps me agile and energetic."
  },
  {
    id: 5,
    name: "Usain Bolt",
    sport: "Athletics",
    achievements: [
      "8× Olympic Gold Medalist",
      "World Record holder 100m & 200m",
      "11× World Champion",
      "Only sprinter to win Olympic 100m and 200m titles at 3 consecutive Olympics"
    ],
    imageUrl: "/images/boult_image.jpg",
    bgColor: "from-yellow-500 to-yellow-700",
    quote: "Don't think about the start of the race, think about the ending.",
    dietTip: "During training, I increase my caloric intake significantly with lean proteins and complex carbs for explosive energy."
  },
  {
    id: 6,
    name: "Michael Jordan",
    sport: "Basketball",
    achievements: [
      "6× NBA champion",
      "5× NBA Most Valuable Player",
      "14× NBA All-Star",
      "2× Olympic gold medalist"
    ],
    imageUrl: "/images/michael-jordan.jpg",
    bgColor: "from-red-600 to-red-800",
    quote: "I've failed over and over again in my life. And that is why I succeed.",
    dietTip: "Your body is like a high-performance machine. Give it the right fuel, and it will perform at its peak potential."
  },
  {
    id: 7,
    name: "Mike Tyson",
    sport: "Boxing",
    achievements: [
      "Youngest heavyweight champion in history",
      "Unified WBA, WBC, and IBF titles",
      "First heavyweight to hold all three major belts simultaneously",
      "International Boxing Hall of Fame inductee"
    ],
    imageUrl: "/images/tyson_image.webp",
    bgColor: "from-gray-600 to-gray-800",
    quote: "Everyone has a plan until they get punched in the mouth.",
    dietTip: "I maintain a high-protein vegan diet now. It's given me tremendous energy and clarity in my training."
  }
];

export default function SportspersonSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<{[key: number]: boolean}>({});
  const [autoplay, setAutoplay] = useState(true);
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextSportsperson();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);
  
  const nextSportsperson = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sportsPersonalities.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSportsperson = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sportsPersonalities.length - 1 : prevIndex - 1
    );
  };
  
  const handleImageError = (id: number) => {
    setImageError(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  const currentSportsperson = sportsPersonalities[currentIndex];
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-primary/20 w-full overflow-hidden"
    >
      <motion.h2 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold text-white mb-6 text-center"
      >
        <span className="text-primary animate-pulse">Champions</span> Corner
      </motion.h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/3 relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              transition={{ duration: 0.4 }}
              className={`aspect-square relative rounded-lg overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20 ${imageError[currentSportsperson.id] ? `bg-gradient-to-br ${currentSportsperson.bgColor}` : ''}`}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              
              {!imageError[currentSportsperson.id] ? (
                <Image
                  src={currentSportsperson.imageUrl}
                  alt={currentSportsperson.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  onError={() => handleImageError(currentSportsperson.id)}
                  unoptimized
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaUser className="text-white/20 text-9xl" />
                </div>
              )}
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute bottom-3 left-3 right-3 z-20"
              >
                <h3 className="text-xl font-bold text-white">{currentSportsperson.name}</h3>
                <p className="text-primary">{currentSportsperson.sport}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-4 space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSportsperson}
              className="bg-gray-800 hover:bg-gray-700 text-primary p-2 rounded-full transition-colors"
              aria-label="Previous sportsperson"
            >
              <FaChevronLeft />
            </motion.button>
            
            <motion.div className="flex items-center space-x-1">
              {sportsPersonalities.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 w-2 rounded-full ${idx === currentIndex ? 'bg-primary' : 'bg-gray-600'}`}
                  whileHover={{ scale: 1.5 }}
                  onClick={() => setCurrentIndex(idx)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSportsperson}
              className="bg-gray-800 hover:bg-gray-700 text-primary p-2 rounded-full transition-colors"
              aria-label="Next sportsperson"
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="bg-gray-800/50 rounded-lg p-5 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(255, 77, 0, 0.1)' }}
              >
                <div className="flex">
                  <FaQuoteLeft className="text-primary/30 text-xl mr-2 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 italic text-lg">
                    {currentSportsperson.quote}
                  </p>
                  <FaQuoteRight className="text-primary/30 text-xl ml-2 self-end flex-shrink-0" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mt-6"
              >
                <h4 className="text-lg font-semibold text-primary mb-3">Nutrition Tip:</h4>
                <p className="text-gray-300">{currentSportsperson.dietTip}</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mt-6"
              >
                <h4 className="text-lg font-semibold text-primary mb-3">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {currentSportsperson.achievements.map((achievement, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-sm text-gray-400">
              Get inspired by the best athletes and their approach to nutrition and training.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 