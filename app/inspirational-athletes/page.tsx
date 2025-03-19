'use client';

import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SportspersonSection from '../components/SportspersonSection';
import { FaStar, FaTrophy, FaHeartbeat, FaBrain } from 'react-icons/fa';

export default function InspirationalAthletes() {
  // Add scroll restoration for a better user experience
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 animate-float" style={{ animationDuration: '7s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary/5 animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-primary/5 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-20 h-20 rounded-full bg-primary/10 animate-float" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
      </div>
      
      <Header />
      
      <main className="flex-grow py-16 mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-white animate-fadeIn">
            <span className="text-primary animate-glow inline-block">Inspirational</span> Athletes
          </h1>
          
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 text-lg">
            Learn from the world's greatest athletes and their approach to nutrition, training, and mental strength. 
            Get inspired by their journeys and apply their wisdom to your own athletic endeavors.
          </p>
          
          <div className="max-w-6xl mx-auto animate-fadeIn mb-16">
            <SportspersonSection />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <FaHeartbeat className="text-primary text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white">Dietary Discipline</h3>
              </div>
              <p className="text-gray-300">
                Elite athletes understand that nutrition is the foundation of performance. 
                They maintain strict dietary routines that fuel their bodies for optimal results.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <FaTrophy className="text-primary text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white">Champion Mindset</h3>
              </div>
              <p className="text-gray-300">
                Champions develop mental resilience that helps them overcome obstacles and setbacks. 
                They view challenges as opportunities for growth rather than insurmountable barriers.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <FaBrain className="text-primary text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white">Mental Strength</h3>
              </div>
              <p className="text-gray-300">
                Top athletes dedicate time to mental training, including visualization, meditation, 
                and goal-setting to enhance focus, reduce anxiety, and perform under pressure.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <FaStar className="text-primary text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white">Consistency</h3>
              </div>
              <p className="text-gray-300">
                The most successful athletes maintain consistency in training, recovery, and nutrition. 
                They understand that small, daily habits compound over time to create extraordinary results.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900/70 rounded-xl p-8 border border-primary/20 max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              How Champions <span className="text-primary">Approach Nutrition</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Pre-Competition Meals</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Focus on complex carbohydrates for sustained energy</li>
                  <li>Moderate protein intake for muscle support</li>
                  <li>Low fat and fiber to prevent digestive discomfort</li>
                  <li>Proper hydration with electrolytes</li>
                  <li>Familiar foods that have been tested in training</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Recovery Nutrition</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Protein within 30 minutes post-exercise for muscle repair</li>
                  <li>Carbohydrates to replenish glycogen stores</li>
                  <li>Anti-inflammatory foods to reduce muscle soreness</li>
                  <li>Hydration to replace fluid losses</li>
                  <li>Micronutrients from vegetables and fruits for recovery</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-300">
                "The difference between good and great often comes down to the details in your nutrition plan."
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 