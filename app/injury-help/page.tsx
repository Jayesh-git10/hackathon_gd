'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HospitalFinder from '../components/HospitalFinder';
import { FaBandAid, FaRunning, FaHeartbeat, FaArrowRight, FaIcicles, FaHotjar, FaAppleAlt, FaBed } from 'react-icons/fa';

interface InjuryType {
  id: string;
  title: string;
  description: string;
  firstAid: string[];
  recovery: string[];
  prevention: string[];
}

export default function InjuryHelp() {
  const [selectedInjury, setSelectedInjury] = useState<string | null>(null);

  const commonInjuries: InjuryType[] = [
    {
      id: 'muscle-strain',
      title: 'Muscle Strain',
      description: 'A muscle strain occurs when muscle fibers are overstretched or torn. Common in sports that involve sprinting or jumping.',
      firstAid: [
        'Rest the injured area immediately',
        'Apply ice for 15-20 minutes every 2-3 hours',
        'Compress with an elastic bandage',
        'Elevate the injured area above heart level when possible',
        'Take anti-inflammatory medication if needed'
      ],
      recovery: [
        'Follow the R.I.C.E protocol for 48-72 hours',
        'Begin gentle stretching when pain subsides',
        'Gradually return to activity as strength returns',
        'Consider physical therapy for moderate to severe strains'
      ],
      prevention: [
        'Warm up properly before exercise',
        'Incorporate strength training',
        'Maintain flexibility with regular stretching',
        'Gradually increase training intensity',
        'Use proper technique during sports activities'
      ]
    },
    {
      id: 'sprained-ankle',
      title: 'Sprained Ankle',
      description: 'An ankle sprain occurs when the ligaments are stretched or torn. Common in sports with lateral movements like basketball and soccer.',
      firstAid: [
        'Stop activity immediately',
        'Apply ice for 15-20 minutes every 2-3 hours',
        'Compress with an elastic bandage',
        'Elevate the ankle above heart level',
        'Avoid putting weight on the injured ankle'
      ],
      recovery: [
        'Follow the R.I.C.E protocol for 24-72 hours',
        'Use crutches if needed for severe sprains',
        'Begin ankle mobility exercises when pain allows',
        'Gradually rebuild strength with resistance exercises',
        'Return to sport only when full stability is restored'
      ],
      prevention: [
        'Wear appropriate footwear for your sport',
        'Use ankle braces or tape for support if needed',
        'Strengthen ankle muscles with balance exercises',
        'Improve proprioception with balance training',
        'Be cautious on uneven surfaces'
      ]
    },
    {
      id: 'knee-injury',
      title: 'Knee Injury',
      description: 'Knee injuries include ACL tears, meniscus tears, and patellofemoral pain. Common in sports with jumping, pivoting, and sudden stops.',
      firstAid: [
        'Stop activity immediately',
        'Apply ice for 15-20 minutes every 2-3 hours',
        'Compress with an elastic bandage',
        'Elevate the leg when resting',
        'Use crutches if unable to bear weight'
      ],
      recovery: [
        'Seek medical evaluation - knee injuries often require professional diagnosis',
        'Follow physician recommendations for treatment',
        'Physical therapy is crucial for proper rehabilitation',
        'Strengthen surrounding muscles (quadriceps, hamstrings)',
        'Return to sport gradually following medical clearance'
      ],
      prevention: [
        'Strengthen quadriceps and hamstrings',
        'Incorporate proper landing techniques',
        'Improve core stability',
        'Use proper form during squats and lunges',
        'Consider neuromuscular training programs'
      ]
    },
    {
      id: 'shoulder-injury',
      title: 'Shoulder Injury',
      description: 'Shoulder injuries include rotator cuff tears, dislocations, and impingement. Common in throwing sports, swimming, and weightlifting.',
      firstAid: [
        'Rest the shoulder immediately',
        'Apply ice for 15-20 minutes every 2-3 hours',
        'Use a sling if needed for comfort',
        'Take anti-inflammatory medication if needed',
        'Seek medical attention for severe pain or deformity'
      ],
      recovery: [
        'Follow medical advice for treatment plan',
        'Begin gentle range of motion exercises when appropriate',
        'Gradually strengthen rotator cuff muscles',
        'Focus on proper scapular mechanics',
        'Return to sport-specific movements slowly'
      ],
      prevention: [
        'Strengthen rotator cuff muscles',
        'Improve scapular stability',
        'Use proper technique during overhead activities',
        'Gradually increase training volume',
        'Include shoulder mobility exercises in warm-up'
      ]
    }
  ];

  const getSelectedInjury = () => {
    return commonInjuries.find(injury => injury.id === selectedInjury);
  };

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
      
      <main className="flex-grow py-12 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-10 text-white animate-fadeIn">
            Athlete <span className="text-primary animate-glow inline-block">Injury Help</span> Center
          </h1>
          
          <div className="max-w-4xl mx-auto animate-fadeIn">
            {/* Hospital Finder Section */}
            <div className="mb-12" id="hospital-finder">
              <HospitalFinder />
            </div>
            
            {/* RICE Method Section */}
            <div className="card mb-12 hover-card">
              <h2 className="section-title">The R.I.C.E. Method</h2>
              <p className="text-gray-300 mb-6">
                The R.I.C.E. method is a first-aid treatment approach for soft tissue injuries. Follow these steps immediately after injury:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <FaBed className="text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Rest</h3>
                  </div>
                  <p className="text-gray-300">
                    Stop using the injured area to prevent further damage. Avoid activities that cause pain.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <FaIcicles className="text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Ice</h3>
                  </div>
                  <p className="text-gray-300">
                    Apply ice for 15-20 minutes every 2-3 hours to reduce swelling and pain.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <FaBandAid className="text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Compression</h3>
                  </div>
                  <p className="text-gray-300">
                    Use an elastic bandage to compress the injured area, reducing swelling.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <FaArrowRight className="text-primary transform rotate-90" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Elevation</h3>
                  </div>
                  <p className="text-gray-300">
                    Elevate the injured area above heart level to help reduce swelling.
                  </p>
                </div>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 text-gray-300 p-4 rounded-lg">
                <p className="font-medium text-red-400 mb-1">Important Note:</p>
                <p>
                  For severe injuries, including those with significant swelling, inability to bear weight, or visible deformity, seek medical attention immediately. The R.I.C.E. method is a first-aid approach but is not a substitute for professional medical care.
                </p>
              </div>
            </div>
            
            {/* Common Injuries Section */}
            <div className="card mb-12 hover-card">
              <h2 className="section-title">Common Athletic Injuries</h2>
              <p className="text-gray-300 mb-6">
                Select an injury to learn about first aid, recovery, and prevention strategies:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {commonInjuries.map(injury => (
                  <button
                    key={injury.id}
                    onClick={() => setSelectedInjury(injury.id)}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      selectedInjury === injury.id
                        ? 'bg-primary/20 border-primary'
                        : 'bg-gray-800/50 border-gray-700 hover:border-primary/30'
                    }`}
                  >
                    <h3 className="text-lg font-medium text-white mb-2">{injury.title}</h3>
                    <p className="text-gray-300 text-sm">{injury.description}</p>
                  </button>
                ))}
              </div>
              
              {selectedInjury && (
                <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/20 animate-fadeIn">
                  <h3 className="text-xl font-semibold text-primary mb-4">{getSelectedInjury()?.title}</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                      <FaBandAid className="text-primary mr-2" />
                      First Aid
                    </h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {getSelectedInjury()?.firstAid.map((item, index) => (
                        <li key={index} className="text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                      <FaHeartbeat className="text-primary mr-2" />
                      Recovery
                    </h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {getSelectedInjury()?.recovery.map((item, index) => (
                        <li key={index} className="text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                      <FaRunning className="text-primary mr-2" />
                      Prevention
                    </h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {getSelectedInjury()?.prevention.map((item, index) => (
                        <li key={index} className="text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            {/* Nutrition for Recovery Section */}
            <div className="card mb-12 hover-card">
              <h2 className="section-title">Nutrition for Injury Recovery</h2>
              <p className="text-gray-300 mb-6">
                Proper nutrition plays a crucial role in injury recovery. Focus on these key nutrients:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <FaAppleAlt className="text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Anti-Inflammatory Foods</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Include foods that help reduce inflammation in your diet:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-300">
                    <li>Fatty fish (salmon, mackerel)</li>
                    <li>Berries (blueberries, strawberries)</li>
                    <li>Leafy greens (spinach, kale)</li>
                    <li>Nuts and seeds</li>
                    <li>Olive oil</li>
                    <li>Turmeric and ginger</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <FaHotjar className="text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Key Nutrients for Healing</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Focus on these essential nutrients to support tissue repair:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-300">
                    <li>Protein (lean meats, legumes, dairy)</li>
                    <li>Vitamin C (citrus fruits, bell peppers)</li>
                    <li>Zinc (meat, shellfish, legumes)</li>
                    <li>Calcium (dairy, fortified plant milks)</li>
                    <li>Vitamin D (fatty fish, eggs, sunlight)</li>
                    <li>Omega-3 fatty acids (fish, flaxseeds, walnuts)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* When to Seek Medical Help */}
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg mb-12">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                When to Seek Medical Help
              </h2>
              <p className="text-gray-300 mb-4">
                While many sports injuries can be treated with first aid and home care, some require immediate medical attention. Seek medical help if you experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Severe pain or swelling</li>
                <li>Inability to bear weight on the injured limb</li>
                <li>Visible deformity or bone protrusion</li>
                <li>Popping or cracking sound at the time of injury</li>
                <li>Joint instability or inability to move the joint</li>
                <li>Numbness or tingling</li>
                <li>Symptoms that don't improve within 48 hours of home treatment</li>
                <li>Recurrence of a previous injury</li>
              </ul>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => document.getElementById('hospital-finder')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  Find Nearby Hospitals
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 