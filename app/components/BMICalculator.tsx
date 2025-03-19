'use client';

import { useState, useEffect } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [bmi, setBmi] = useState<number>(0);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBMI.toFixed(1)));
      
      // Determine BMI category
      if (calculatedBMI < 18.5) {
        setBmiCategory('Underweight');
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
        setBmiCategory('Normal');
      } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obese');
      }
    }
  };

  // Calculate the rotation angle for the needle based on BMI
  const getNeedleRotation = () => {
    // Map BMI range (typically 15-40) to angle range (0-180 degrees)
    const minBMI = 15;
    const maxBMI = 40;
    const minAngle = 0;
    const maxAngle = 180;
    
    let mappedAngle = ((bmi - minBMI) / (maxBMI - minBMI)) * (maxAngle - minAngle) + minAngle;
    
    // Clamp the angle between min and max
    mappedAngle = Math.max(minAngle, Math.min(maxAngle, mappedAngle));
    
    return mappedAngle;
  };

  // Get color based on BMI value
  const getGradientColor = () => {
    // Map BMI to a color intensity
    const intensity = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
    
    // Return a gradient from fade red to neon red
    return `hsl(0, ${50 + intensity/2}%, ${70 - intensity/3}%)`;
  };

  // Get the stroke dash offset for the progress arc
  const getProgressArcOffset = () => {
    const circumference = 2 * Math.PI * 120; // 2πr where r=120 (the radius of our arc)
    const progressPercentage = getNeedleRotation() / 180;
    return circumference * (1 - progressPercentage / 2);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 shadow-lg mb-8 border border-primary/20">
      <h2 className="text-2xl font-bold text-primary mb-4">BMI Calculator</h2>
      
      <div className="flex flex-col items-center mb-6">
        {/* Semicircular gauge */}
        <div className="relative w-72 h-40 mb-6">
          {/* Outer ring with gradient */}
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 300 150">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 77, 0, 0.3)" />
                <stop offset="50%" stopColor="rgba(255, 77, 0, 0.6)" />
                <stop offset="100%" stopColor="rgba(255, 77, 0, 0.9)" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Background track */}
            <path 
              d="M 30 150 A 120 120 0 0 1 270 150" 
              fill="none" 
              stroke="rgba(31, 41, 55, 0.5)" 
              strokeWidth="12" 
              strokeLinecap="round"
            />
            
            {/* Progress track with gradient */}
            <path 
              d="M 30 150 A 120 120 0 0 1 270 150" 
              fill="none" 
              stroke="url(#gaugeGradient)" 
              strokeWidth="12" 
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={getProgressArcOffset()}
              filter="url(#glow)"
            />
            
            {/* Tick marks */}
            {[...Array(9)].map((_, i) => (
              <line 
                key={i}
                x1="150" 
                y1="150" 
                x2="150" 
                y2="130"
                stroke="rgba(209, 213, 219, 0.6)"
                strokeWidth="2"
                transform={`rotate(${-90 + i * 22.5} 150 150)`}
              />
            ))}
            
            {/* BMI value labels */}
            {['15', '20', '25', '30', '35', '40+'].map((label, i) => (
              <text 
                key={i}
                x={30 + i * 48} 
                y="125"
                fill="rgba(209, 213, 219, 0.8)"
                fontSize="10"
                textAnchor="middle"
              >
                {label}
              </text>
            ))}
            
            {/* Category labels */}
            <text x="60" y="100" fill="rgba(110, 231, 183, 0.8)" fontSize="10" textAnchor="middle">Underweight</text>
            <text x="120" y="85" fill="rgba(52, 211, 153, 0.8)" fontSize="10" textAnchor="middle">Normal</text>
            <text x="180" y="85" fill="rgba(251, 191, 36, 0.8)" fontSize="10" textAnchor="middle">Overweight</text>
            <text x="240" y="100" fill="rgba(239, 68, 68, 0.8)" fontSize="10" textAnchor="middle">Obese</text>
            
            {/* Needle */}
            <g transform={`rotate(${getNeedleRotation() - 90} 150 150)`}>
              <line 
                x1="150" 
                y1="150" 
                x2="150" 
                y2="40"
                stroke={getGradientColor()}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <circle cx="150" cy="40" r="6" fill={getGradientColor()} filter="url(#glow)" />
            </g>
            
            {/* Center point */}
            <circle cx="150" cy="150" r="10" fill="rgba(31, 41, 55, 0.8)" stroke="rgba(209, 213, 219, 0.8)" strokeWidth="2" />
          </svg>
        </div>
        
        {/* BMI display */}
        <div className="text-center mb-2">
          <div className="text-5xl font-bold" style={{ color: getGradientColor() }}>{bmi}</div>
          <div className="text-sm text-gray-400 mt-1">Your BMI</div>
        </div>
        
        {/* BMI category */}
        <div 
          className="text-lg font-semibold px-6 py-1 rounded-full mt-1 border-2"
          style={{ 
            color: getGradientColor(),
            borderColor: getGradientColor(),
            backgroundColor: `${getGradientColor()}15`
          }}
        >
          {bmiCategory}
        </div>
      </div>
      
      {/* Input controls */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <label htmlFor="weight" className="block text-gray-300 mb-2 font-medium">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            min="30"
            max="200"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full bg-gray-800/80 border border-gray-600 rounded-md py-2 px-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="relative mt-3 px-1">
            <input
              type="range"
              min="30"
              max="200"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
              <span>30</span>
              <span>200</span>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="height" className="block text-gray-300 mb-2 font-medium">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            min="100"
            max="220"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full bg-gray-800/80 border border-gray-600 rounded-md py-2 px-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="relative mt-3 px-1">
            <input
              type="range"
              min="100"
              max="220"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
              <span>100</span>
              <span>220</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* BMI information */}
      <div className="mt-6 text-sm text-gray-400 bg-gray-800/30 p-4 rounded-lg border border-primary/10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <p><span className="text-gray-300 font-medium">Underweight:</span> BMI &lt; 18.5</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
            <p><span className="text-gray-300 font-medium">Normal:</span> BMI 18.5-24.9</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
            <p><span className="text-gray-300 font-medium">Overweight:</span> BMI 25-29.9</p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <p><span className="text-gray-300 font-medium">Obesity:</span> BMI ≥ 30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator; 