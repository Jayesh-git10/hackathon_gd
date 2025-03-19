import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Solid black background instead of gradient */}
      <div className="fixed inset-0 bg-black z-0"></div>
      
      <Header />
      
      <main className="flex-grow py-12 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-10 text-white">
            About <span className="text-primary">Athlete Diet</span> Planner
          </h1>
          
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <div className="card mb-8 hover-card">
              <h2 className="section-title">Our Mission</h2>
              <p className="text-gray-300 mb-6">
                At Athlete Diet Planner, we believe that proper nutrition is the foundation of athletic excellence. 
                Our mission is to provide personalized nutrition plans that help athletes of all levels optimize 
                their performance, recovery, and overall health.
              </p>
              <p className="text-gray-300">
                Whether you're a professional athlete, weekend warrior, or just starting your fitness journey, 
                our scientifically-backed nutrition plans are designed to meet your specific needs and help you 
                reach your full potential.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="card hover-card animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <h2 className="section-title">Why Choose Us</h2>
                <ul className="list-disc pl-5 space-y-3 text-gray-300">
                  <li>Personalized nutrition plans based on your specific sport, training intensity, and goals</li>
                  <li>Evidence-based recommendations from sports nutrition research</li>
                  <li>Flexible meal options that accommodate dietary restrictions and preferences</li>
                  <li>Practical guidance on meal timing, hydration, and supplementation</li>
                  <li>Regular updates to your plan as your training and goals evolve</li>
                </ul>
              </div>
              
              <div className="card hover-card animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <h2 className="section-title">Our Approach</h2>
                <p className="text-gray-300 mb-4">
                  We take a holistic approach to sports nutrition, considering not just calories and macronutrients, 
                  but also the quality and timing of your food intake, your hydration needs, and appropriate 
                  supplementation.
                </p>
                <p className="text-gray-300">
                  Our recommendations are based on the latest research in sports nutrition and are designed to 
                  support your training, enhance recovery, and improve overall performance.
                </p>
              </div>
            </div>
            
            <div className="card mb-8 hover-card animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <h2 className="section-title">Meet Our Team</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="w-36 h-36 rounded-full bg-primary/20 mx-auto mb-4 overflow-hidden border-2 border-primary hover:border-4 hover:shadow-glow transition-all duration-300">
                    <img src="/images/Adwait_image.jpg" alt="Adwait Pathwardhan" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Adwait Pathwardhan</h3>
                </div>
                
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="w-36 h-36 rounded-full bg-primary/20 mx-auto mb-4 overflow-hidden border-2 border-primary hover:border-4 hover:shadow-glow transition-all duration-300">
                    <img src="/images/Amitesh_image.jpg" alt="Amitesh Anand" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Amitesh Anand</h3>
                </div>
                
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="w-36 h-36 rounded-full bg-primary/20 mx-auto mb-4 overflow-hidden border-2 border-primary hover:border-4 hover:shadow-glow transition-all duration-300">
                    <img src="/images/Dinkal_image.jpg" alt="Dinkal Yadhuvanshi" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Dinkal Yadhuvanshi</h3>
                </div>

                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="w-36 h-36 rounded-full bg-primary/20 mx-auto mb-4 overflow-hidden border-2 border-primary hover:border-4 hover:shadow-glow transition-all duration-300">
                    <img src="/images/Jayesh_image.jpg" alt="Jayesh Sharma" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Jayesh Sharma</h3>
                </div>
              </div>
            </div>
            
            <div className="card hover-card animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <h2 className="section-title">Get Started Today</h2>
              <p className="text-gray-300 mb-6">
                Ready to take your performance to the next level? Create your personalized nutrition plan today 
                by filling out our comprehensive assessment form. Our algorithm will generate a customized plan 
                based on your specific needs and goals.
              </p>
              <div className="flex justify-center">
                <Link href="/diet-planner" className="btn-primary">
                  Create Your Diet Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 