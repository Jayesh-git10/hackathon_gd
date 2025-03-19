'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import BMICalculator from '../components/BMICalculator'

// Define interfaces for type safety
interface FormValues {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  sport: string;
  trainingIntensity: string;
  trainingFrequency: string;
  dietaryRestrictions: string[];
  currentDiet: string;
  goals: string;
}

interface Meal {
  title: string;
  description: string;
  suggestions: string[];
}

interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
}

interface DietPlan {
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  mealPlan: MealPlan;
  hydration: string;
  supplements: string[];
  timingRecommendations: string;
}

// Define the form validation schema
const DietFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
  gender: Yup.string().required('Gender is required'),
  weight: Yup.number()
    .required('Weight is required')
    .positive('Weight must be positive'),
  height: Yup.number()
    .required('Height is required')
    .positive('Height must be positive'),
  sport: Yup.string().required('Sport is required'),
  trainingIntensity: Yup.string().required('Training intensity is required'),
  trainingFrequency: Yup.number()
    .required('Training frequency is required')
    .min(0, 'Training frequency must be at least 0')
    .max(7, 'Training frequency cannot exceed 7 days per week'),
  dietaryRestrictions: Yup.array().of(Yup.string()),
  currentDiet: Yup.string(),
  goals: Yup.string().required('Goals are required'),
});

// List of sports
const sports = [
  'Running',
  'Swimming',
  'Cycling',
  'Basketball',
  'Football',
  'Soccer',
  'Tennis',
  'Volleyball',
  'Weightlifting',
  'CrossFit',
  'Gymnastics',
  'Martial Arts',
  'Boxing',
  'Wrestling',
  'Track and Field',
  'Other'
];

// List of dietary restrictions
const dietaryRestrictionOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Lactose Intolerant',
  'Nut Allergies',
  'Kosher',
  'Halal',
  'Pescatarian',
  'Keto',
  'Paleo',
  'Low FODMAP',
  'Other'
];

export default function DietPlanner() {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Add scroll restoration effect when diet plan changes
  useEffect(() => {
    if (dietPlan) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [dietPlan]);

  // Add scroll listener to show/hide the back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      sport: '',
      trainingIntensity: '',
      trainingFrequency: '',
      dietaryRestrictions: [],
      currentDiet: '',
      goals: '',
    },
    validationSchema: DietFormSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      
      // Simulate API call to generate diet plan
      setTimeout(() => {
        const generatedPlan = generateDietPlan(values);
        setDietPlan(generatedPlan);
        setIsLoading(false);
      }, 1500);
    },
  });

  // Function to generate a diet plan based on form values
  const generateDietPlan = (values: FormValues): DietPlan => {
    // This is a simplified example. In a real application, this would be a more complex algorithm
    // or an API call to a backend service that generates the diet plan.
    
    // Calculate basic metrics
    const isMale = values.gender === 'male';
    const bmr = isMale
      ? 10 * Number(values.weight) + 6.25 * Number(values.height) - 5 * Number(values.age) + 5
      : 10 * Number(values.weight) + 6.25 * Number(values.height) - 5 * Number(values.age) - 161;
    
    // Adjust for training intensity
    let calorieMultiplier = 1.2; // Sedentary
    if (values.trainingIntensity === 'light') calorieMultiplier = 1.375;
    if (values.trainingIntensity === 'moderate') calorieMultiplier = 1.55;
    if (values.trainingIntensity === 'high') calorieMultiplier = 1.725;
    if (values.trainingIntensity === 'very-high') calorieMultiplier = 1.9;
    
    const dailyCalories = Math.round(bmr * calorieMultiplier);
    
    // Adjust macros based on sport
    let proteinPercentage = 0.3;
    let carbPercentage = 0.4;
    let fatPercentage = 0.3;
    
    // Endurance sports need more carbs
    if (['Running', 'Swimming', 'Cycling'].includes(values.sport)) {
      carbPercentage = 0.5;
      proteinPercentage = 0.25;
      fatPercentage = 0.25;
    }
    
    // Strength sports need more protein
    if (['Weightlifting', 'CrossFit', 'Wrestling'].includes(values.sport)) {
      proteinPercentage = 0.35;
      carbPercentage = 0.35;
      fatPercentage = 0.3;
    }
    
    // Calculate macros in grams
    const proteinGrams = Math.round((dailyCalories * proteinPercentage) / 4); // 4 calories per gram of protein
    const carbGrams = Math.round((dailyCalories * carbPercentage) / 4); // 4 calories per gram of carbs
    const fatGrams = Math.round((dailyCalories * fatPercentage) / 9); // 9 calories per gram of fat
    
    // Generate meal plan
    const mealPlan: MealPlan = {
      breakfast: {
        title: 'Breakfast',
        description: `A balanced breakfast with approximately ${Math.round(proteinGrams * 0.25)}g protein, ${Math.round(carbGrams * 0.3)}g carbs, and ${Math.round(fatGrams * 0.25)}g healthy fats.`,
        suggestions: [] as string[]
      },
      lunch: {
        title: 'Lunch',
        description: `A nutrient-dense lunch with approximately ${Math.round(proteinGrams * 0.35)}g protein, ${Math.round(carbGrams * 0.3)}g carbs, and ${Math.round(fatGrams * 0.35)}g healthy fats.`,
        suggestions: [] as string[]
      },
      dinner: {
        title: 'Dinner',
        description: `A recovery-focused dinner with approximately ${Math.round(proteinGrams * 0.35)}g protein, ${Math.round(carbGrams * 0.3)}g carbs, and ${Math.round(fatGrams * 0.35)}g healthy fats.`,
        suggestions: [] as string[]
      },
      snacks: {
        title: 'Snacks',
        description: `2-3 daily snacks totaling approximately ${Math.round(proteinGrams * 0.05)}g protein, ${Math.round(carbGrams * 0.1)}g carbs, and ${Math.round(fatGrams * 0.05)}g healthy fats.`,
        suggestions: [] as string[]
      }
    };
    
    // Add meal suggestions based on sport and dietary restrictions
    const hasRestriction = (restriction: string) => values.dietaryRestrictions.includes(restriction);
    
    // Breakfast suggestions
    if (!hasRestriction('Vegan') && !hasRestriction('Vegetarian')) {
      mealPlan.breakfast.suggestions.push('Scrambled eggs with vegetables and whole grain toast');
    } else {
      mealPlan.breakfast.suggestions.push('Tofu scramble with vegetables and whole grain toast');
    }
    mealPlan.breakfast.suggestions.push('Oatmeal with fruits, nuts, and plant-based protein');
    if (!hasRestriction('Lactose Intolerant') && !hasRestriction('Vegan') && !hasRestriction('Vegetarian')) {
      mealPlan.breakfast.suggestions.push('Greek yogurt with berries and granola');
    } else if (!hasRestriction('Lactose Intolerant') && !hasRestriction('Vegan')) {
      mealPlan.breakfast.suggestions.push('Greek yogurt with berries and granola');
    } else {
      mealPlan.breakfast.suggestions.push('Coconut yogurt with berries and granola');
    }
    
    // Lunch suggestions
    if (!hasRestriction('Vegan') && !hasRestriction('Vegetarian')) {
      mealPlan.lunch.suggestions.push('Grilled chicken salad with mixed vegetables and quinoa');
    } else if (hasRestriction('Vegetarian') && !hasRestriction('Vegan')) {
      mealPlan.lunch.suggestions.push('Chickpea and vegetable salad with feta cheese and quinoa');
    } else {
      mealPlan.lunch.suggestions.push('Chickpea and vegetable salad with avocado and quinoa');
    }
    mealPlan.lunch.suggestions.push('Lentil soup with a side of roasted vegetables');
    if (!hasRestriction('Vegan') && !hasRestriction('Vegetarian')) {
      mealPlan.lunch.suggestions.push('Turkey and avocado wrap with a side of fruit');
    } else {
      mealPlan.lunch.suggestions.push('Hummus and avocado wrap with a side of fruit');
    }
    
    // Dinner suggestions
    if (!hasRestriction('Vegan') && !hasRestriction('Vegetarian')) {
      mealPlan.dinner.suggestions.push('Baked salmon with sweet potato and steamed broccoli');
    } else if (hasRestriction('Vegetarian') && !hasRestriction('Vegan')) {
      mealPlan.dinner.suggestions.push('Stuffed bell peppers with quinoa, beans, and cheese');
    } else {
      mealPlan.dinner.suggestions.push('Stuffed bell peppers with quinoa, beans, and nutritional yeast');
    }
    mealPlan.dinner.suggestions.push('Stir-fried tofu with brown rice and vegetables');
    if (!hasRestriction('Vegan') && !hasRestriction('Vegetarian')) {
      mealPlan.dinner.suggestions.push('Lean beef stir fry with vegetables and brown rice');
    } else {
      mealPlan.dinner.suggestions.push('Tempeh stir fry with vegetables and brown rice');
    }
    
    // Snack suggestions
    mealPlan.snacks.suggestions.push('Apple with almond butter');
    if (!hasRestriction('Lactose Intolerant') && !hasRestriction('Vegan')) {
      mealPlan.snacks.suggestions.push('Protein shake with banana');
    } else {
      mealPlan.snacks.suggestions.push('Plant-based protein shake with banana');
    }
    mealPlan.snacks.suggestions.push('Trail mix with nuts and dried fruits');
    mealPlan.snacks.suggestions.push('Hummus with carrot and celery sticks');
    
    return {
      dailyCalories,
      macros: {
        protein: proteinGrams,
        carbs: carbGrams,
        fat: fatGrams
      },
      mealPlan,
      hydration: `Drink at least ${Math.round(Number(values.weight) * 0.03)} liters of water daily. Increase by 0.5-1 liter on training days.`,
      supplements: getSportSpecificSupplements(values.sport),
      timingRecommendations: getTimingRecommendations(values.sport, values.trainingIntensity)
    };
  };

  // Function to get sport-specific supplement recommendations
  const getSportSpecificSupplements = (sport: string) => {
    const baseSupplements = [
      'Multivitamin - daily to ensure micronutrient needs are met',
      'Vitamin D - 1000-2000 IU daily, especially if limited sun exposure'
    ];
    
    if (['Running', 'Swimming', 'Cycling'].includes(sport)) {
      return [
        ...baseSupplements,
        'Electrolyte supplements - during long training sessions',
        'Magnesium - 300-400mg daily to support muscle function and recovery'
      ];
    }
    
    if (['Weightlifting', 'CrossFit', 'Wrestling'].includes(sport)) {
      return [
        ...baseSupplements,
        'Creatine monohydrate - 3-5g daily for strength and power',
        'Branched-chain amino acids (BCAAs) - around training sessions'
      ];
    }
    
    if (['Basketball', 'Football', 'Soccer', 'Tennis'].includes(sport)) {
      return [
        ...baseSupplements,
        'Creatine monohydrate - 3-5g daily for explosive movements',
        'Electrolyte supplements - during intense training or competition'
      ];
    }
    
    return baseSupplements;
  };

  // Function to get timing recommendations
  const getTimingRecommendations = (sport: string, intensity: string) => {
    const isHighIntensity = ['high', 'very-high'].includes(intensity);
    
    if (['Running', 'Swimming', 'Cycling'].includes(sport)) {
      return isHighIntensity
        ? 'Consume 30-60g of carbs per hour during training sessions longer than 60 minutes. Eat a carb-rich meal 3-4 hours before training and a recovery meal with 3:1 carb to protein ratio within 30 minutes after training.'
        : 'Eat a balanced meal 2-3 hours before training. Consume a small snack with protein and carbs within 45 minutes after training.';
    }
    
    if (['Weightlifting', 'CrossFit', 'Wrestling'].includes(sport)) {
      return isHighIntensity
        ? 'Consume 20-30g of protein and 40-60g of carbs within 30 minutes after training. Consider 5-10g of BCAAs before and during training. Eat a balanced meal 2-3 hours before training.'
        : 'Eat a balanced meal 2-3 hours before training. Consume 20g of protein within 45 minutes after training.';
    }
    
    return 'Eat a balanced meal 2-3 hours before training. Consume a recovery snack or meal with both protein and carbs within 45 minutes after training.';
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
            Personalized <span className="text-primary animate-glow inline-block">Athlete Diet</span> Planner
          </h1>
          
          {!dietPlan ? (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              {/* BMI Calculator Section */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-primary/20">
                  <BMICalculator />
                </div>
              </div>
              
              <div className="card mb-8 hover-card">
                <h2 className="section-title">Create Your Personalized Diet Plan</h2>
                
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Personal Information */}
                    <div>
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-input text-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="age" className="form-label">Age</label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        className="form-input text-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.age}
                      />
                      {formik.touched.age && formik.errors.age && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        className="form-input text-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {formik.touched.gender && formik.errors.gender && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="weight" className="form-label">Weight (kg)</label>
                      <input
                        id="weight"
                        name="weight"
                        type="number"
                        className="form-input text-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.weight}
                      />
                      {formik.touched.weight && formik.errors.weight && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.weight}</div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="height" className="form-label">Height (cm)</label>
                      <input
                        id="height"
                        name="height"
                        type="number"
                        className="form-input text-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.height}
                      />
                      {formik.touched.height && formik.errors.height && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.height}</div>
                      )}
                    </div>
                  </div>
                  
                  <hr className="my-8 border-gray-700" />
                  
                  {/* Athletic Information */}
                  <h3 className="text-xl font-semibold mb-6 text-white">Athletic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <label htmlFor="sport" className="form-label">Primary Sport</label>
                      <select
                        id="sport"
                        name="sport"
                        className="form-input text-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sport}
                      >
                        <option value="">Select Sport</option>
                        {sports.map((sport) => (
                          <option key={sport} value={sport}>{sport}</option>
                        ))}
                      </select>
                      {formik.touched.sport && formik.errors.sport && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.sport}</div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="trainingIntensity" className="form-label">Training Intensity</label>
                      <select
                        id="trainingIntensity"
                        name="trainingIntensity"
                        className="form-input text-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.trainingIntensity}
                      >
                        <option value="">Select Intensity</option>
                        <option value="light">Light (Easy effort, can maintain a conversation)</option>
                        <option value="moderate">Moderate (Somewhat challenging, slightly breathless)</option>
                        <option value="high">High (Very challenging, difficult to talk)</option>
                        <option value="very-high">Very High (Maximum effort, competition level)</option>
                      </select>
                      {formik.touched.trainingIntensity && formik.errors.trainingIntensity && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.trainingIntensity}</div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="trainingFrequency" className="form-label">Training Days Per Week</label>
                      <input
                        id="trainingFrequency"
                        name="trainingFrequency"
                        type="number"
                        min="0"
                        max="7"
                        className="form-input text-primary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.trainingFrequency}
                      />
                      {formik.touched.trainingFrequency && formik.errors.trainingFrequency && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.trainingFrequency}</div>
                      )}
                    </div>
                  </div>
                  
                  <hr className="my-8 border-gray-700" />
                  
                  {/* Dietary Information */}
                  <h3 className="text-xl font-semibold mb-6 text-white">Dietary Information</h3>
                  <div className="mb-8">
                    <label className="form-label">Dietary Restrictions</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      {dietaryRestrictionOptions.map((restriction) => (
                        <div key={restriction} className="flex items-center">
                          <input
                            id={`restriction-${restriction}`}
                            name="dietaryRestrictions"
                            type="checkbox"
                            value={restriction}
                            onChange={(e) => {
                              const currentRestrictions = [...formik.values.dietaryRestrictions];
                              if (e.target.checked) {
                                formik.setFieldValue('dietaryRestrictions', [...currentRestrictions, restriction]);
                              } else {
                                formik.setFieldValue(
                                  'dietaryRestrictions',
                                  currentRestrictions.filter((r) => r !== restriction)
                                );
                              }
                            }}
                            checked={formik.values.dietaryRestrictions.includes(restriction)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-600 rounded"
                          />
                          <label htmlFor={`restriction-${restriction}`} className="ml-2 text-sm text-gray-300">
                            {restriction}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="currentDiet" className="form-label">Current Diet (Optional)</label>
                    <textarea
                      id="currentDiet"
                      name="currentDiet"
                      rows={3}
                      className="form-input text-primary"
                      placeholder="Briefly describe your current eating habits..."
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.currentDiet}
                    ></textarea>
                  </div>
                  
                  <div className="mb-10">
                    <label htmlFor="goals" className="form-label">Nutrition Goals</label>
                    <select
                      id="goals"
                      name="goals"
                      className="form-input text-primary"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.goals}
                    >
                      <option value="">Select Goal</option>
                      <option value="performance">Maximize Performance</option>
                      <option value="muscle">Build Muscle</option>
                      <option value="endurance">Improve Endurance</option>
                      <option value="weight-loss">Lose Weight</option>
                      <option value="weight-gain">Gain Weight</option>
                      <option value="recovery">Enhance Recovery</option>
                      <option value="overall-health">Improve Overall Health</option>
                    </select>
                    {formik.touched.goals && formik.errors.goals && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.goals}</div>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="btn-primary py-3 px-10 text-lg relative overflow-hidden group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="loading-spinner mr-3"></span>
                          <span className="animate-pulse">Generating Diet Plan...</span>
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10">Generate Diet Plan</span>
                          <span className="absolute inset-0 bg-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Added features section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="bg-secondary/30 p-5 rounded-lg border border-gray-800 hover-card">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white">Fast Results</h3>
                  </div>
                  <p className="text-gray-300 pl-13">
                    Get your personalized diet plan in seconds, not days.
                  </p>
                </div>
                
                <div className="bg-secondary/30 p-5 rounded-lg border border-gray-800 hover-card">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white">Sport-Specific</h3>
                  </div>
                  <p className="text-gray-300 pl-13">
                    Tailored to your specific sport and training intensity.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              <div className="card mb-8 hover-card">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="section-title mb-0">Your Personalized Diet Plan</h2>
                  <button
                    onClick={() => setDietPlan(null)}
                    className="text-gray-400 hover:text-primary transition-colors"
                    title="Back to form"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-10">
                  <h3 className="text-xl font-medium mb-6 text-white">Daily Nutrition Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-secondary p-6 rounded-lg text-center border border-primary/30 hover-card">
                      <div className="text-2xl font-bold text-primary mb-1">{dietPlan.dailyCalories}</div>
                      <div className="text-sm text-gray-300">Daily Calories</div>
                    </div>
                    <div className="bg-secondary p-6 rounded-lg text-center border border-primary/30 hover-card">
                      <div className="text-2xl font-bold text-primary mb-1">{dietPlan.macros.protein}g</div>
                      <div className="text-sm text-gray-300">Protein</div>
                    </div>
                    <div className="bg-secondary p-6 rounded-lg text-center border border-primary/30 hover-card">
                      <div className="text-2xl font-bold text-primary mb-1">{dietPlan.macros.carbs}g</div>
                      <div className="text-sm text-gray-300">Carbohydrates</div>
                    </div>
                    <div className="bg-secondary p-6 rounded-lg text-center border border-primary/30 hover-card">
                      <div className="text-2xl font-bold text-primary mb-1">{dietPlan.macros.fat}g</div>
                      <div className="text-sm text-gray-300">Healthy Fats</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-10">
                  <h3 className="text-xl font-medium mb-6 text-white">Meal Plan</h3>
                  
                  {Object.values(dietPlan.mealPlan).map((meal: any, index: number) => (
                    <div key={meal.title} className={`mb-8 ${index !== 0 ? 'animate-fadeIn' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <h4 className="text-lg font-medium text-primary">{meal.title}</h4>
                      </div>
                      <p className="text-gray-300 mb-4 pl-11">{meal.description}</p>
                      <div className="bg-secondary/50 p-5 rounded-lg border border-gray-700 ml-11 hover-card">
                        <h5 className="font-medium mb-3 text-white">Suggestions:</h5>
                        <ul className="list-disc pl-5 space-y-2">
                          {meal.suggestions.map((suggestion: string, idx: number) => (
                            <li key={idx} className="text-gray-300">{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mb-10">
                  <h3 className="text-xl font-medium mb-4 text-white">Hydration</h3>
                  <div className="bg-secondary/30 p-5 rounded-lg border border-gray-700 hover-card">
                    <p className="text-gray-300">{dietPlan.hydration}</p>
                  </div>
                </div>
                
                <div className="mb-10">
                  <h3 className="text-xl font-medium mb-4 text-white">Supplement Recommendations</h3>
                  <div className="bg-secondary/30 p-5 rounded-lg border border-gray-700 hover-card">
                    <ul className="list-disc pl-5 space-y-2">
                      {dietPlan.supplements.map((supplement: string, index: number) => (
                        <li key={index} className="text-gray-300">{supplement}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-500 mt-4 italic">
                      Note: Always consult with a healthcare professional before starting any supplement regimen.
                    </p>
                  </div>
                </div>
                
                <div className="mb-10">
                  <h3 className="text-xl font-medium mb-4 text-white">Meal Timing Recommendations</h3>
                  <div className="bg-secondary/30 p-5 rounded-lg border border-gray-700 hover-card">
                    <p className="text-gray-300">{dietPlan.timingRecommendations}</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={() => setDietPlan(null)}
                    className="btn-secondary"
                  >
                    Create Another Diet Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Back to top button */}
      {showScrollTop && dietPlan && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg z-50 hover:bg-primary-dark transition-all duration-300"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      
      <Footer />
    </div>
  )
} 