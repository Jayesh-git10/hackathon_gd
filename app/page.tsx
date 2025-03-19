import React from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Solid black background instead of gradient */}
      <div className="fixed inset-0 bg-black z-0"></div>
      
      <Header />
      
      <main className="flex-grow py-12 relative z-10">
        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 animate-float" style={{ animationDuration: '7s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary/5 animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-primary/5 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 right-1/3 w-20 h-20 rounded-full bg-primary/10 animate-float" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white animate-fadeIn">
              Fuel Your <span className="text-primary animate-glow inline-block">Athletic</span> Performance
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Get a personalized nutrition plan designed specifically for your sport, 
              training intensity, and performance goals.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link href="/diet-planner" className="btn-primary text-lg py-4 px-8 animate-pulse">
                Create Your Diet Plan
              </Link>
              <Link href="/about" className="btn-secondary text-lg py-4 px-8">
                Learn More
              </Link>
            </div>
            
            {/* Animated stats counter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <div className="bg-secondary/50 p-6 rounded-lg border border-gray-800 hover-card">
                <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-gray-300">Athletes Served</div>
              </div>
              <div className="bg-secondary/50 p-6 rounded-lg border border-gray-800 hover-card">
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <div className="text-gray-300">Sports Covered</div>
              </div>
              <div className="bg-secondary/50 p-6 rounded-lg border border-gray-800 hover-card">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="card hover-card animate-fadeInLeft" style={{ animationDelay: '0.1s' }}>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-float">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white text-center">Personalized Plans</h2>
                <p className="text-gray-300 text-center">
                  Nutrition plans tailored to your specific sport, body composition, and performance goals.
                </p>
              </div>
              
              <div className="card hover-card animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white text-center">Science-Backed</h2>
                <p className="text-gray-300 text-center">
                  Recommendations based on the latest research in sports nutrition and performance.
                </p>
              </div>
              
              <div className="card hover-card animate-fadeInRight" style={{ animationDelay: '0.5s' }}>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white text-center">Instant Results</h2>
                <p className="text-gray-300 text-center">
                  Get your comprehensive nutrition plan instantly after completing the assessment.
                </p>
              </div>
            </div>
            
            <div className="card hover-card animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
                <h2 className="section-title text-center">How It Works</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="text-center animate-fadeIn" style={{ animationDelay: '0.9s' }}>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 animate-pulse" style={{ animationDelay: '0.2s' }}>
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-2">Enter Your Details</h3>
                    <p className="text-gray-300">
                      Provide information about your physical characteristics, sport, training intensity, and goals.
                    </p>
                  </div>
                  
                  <div className="text-center animate-fadeIn" style={{ animationDelay: '1.1s' }}>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 animate-pulse" style={{ animationDelay: '0.4s' }}>
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-2">Get Your Plan</h3>
                    <p className="text-gray-300">
                      Our system generates a personalized nutrition plan based on your specific needs.
                    </p>
                  </div>
                  
                  <div className="text-center animate-fadeIn" style={{ animationDelay: '1.3s' }}>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 animate-pulse" style={{ animationDelay: '0.6s' }}>
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-2">Fuel Your Performance</h3>
                    <p className="text-gray-300">
                      Follow your plan to optimize your nutrition for better performance and recovery.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-10 animate-fadeInUp" style={{ animationDelay: '1.5s' }}>
                  <Link href="/diet-planner" className="btn-primary animate-glow">
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 