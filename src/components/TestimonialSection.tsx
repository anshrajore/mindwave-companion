
import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "MindWave has completely transformed how I manage my anxiety. The AI chatbot seems to really understand what I'm going through and offers practical advice.",
    author: "Sarah J.",
    role: "Teacher & Anxiety Sufferer",
    rating: 5,
  },
  {
    id: 2,
    quote: "The guided meditations are incredible. They adapt to my mood and have helped me establish a daily mindfulness practice that's improved my sleep quality dramatically.",
    author: "Marcus T.",
    role: "Software Engineer",
    rating: 5,
  },
  {
    id: 3,
    quote: "I was skeptical about an AI therapist, but I'm amazed at how helpful the conversations have been. It's like having support available whenever I need it.",
    author: "Elena R.",
    role: "Healthcare Worker",
    rating: 4,
  },
  {
    id: 4,
    quote: "The mood tracking visualizations helped me identify patterns in my emotional state that I never noticed before. I've made simple lifestyle changes that have had a big impact.",
    author: "David L.",
    role: "Student",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted relative overflow-hidden">
      <div className="absolute top-20 -right-20 w-72 h-72 bg-mindwave-400/10 rounded-full filter blur-3xl opacity-60" />
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-harmony-400/10 rounded-full filter blur-3xl opacity-60" />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people using MindWave to transform their mental wellbeing.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-10 border border-border neo-blur">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-mindwave-100 flex items-center justify-center">
                <Quote className="h-6 w-6 text-mindwave-600" />
              </div>
            </div>
            
            <blockquote className="text-center mb-6">
              <p className="text-xl md:text-2xl leading-relaxed italic">
                "{testimonials[activeIndex].quote}"
              </p>
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="flex mb-2">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-medium">{testimonials[activeIndex].author}</p>
              <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4">
            <button 
              onClick={goToPrev}
              className="w-10 h-10 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-mindwave-600 w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
