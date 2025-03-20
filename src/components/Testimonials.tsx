
import React, { useEffect, useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    role: "Founder, EcoTech Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
    quote: "The AI matching connected me with mentors who perfectly understood my industry challenges. Within 3 months, we secured our first major client and doubled our revenue.",
    rating: 5
  },
  {
    id: 2,
    name: "James Wilson",
    role: "CEO, FinanceAI",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop",
    quote: "Using the platform's AI business tools gave us insights we couldn't have discovered on our own. Our pitch deck went from mediocre to landing us a $2M seed round.",
    rating: 5
  },
  {
    id: 3,
    name: "Michelle Park",
    role: "Co-founder, HealthSync",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
    quote: "The knowledge hub resources helped us navigate regulatory challenges that would have taken months to figure out on our own. Now we're expanding to three new markets.",
    rating: 4
  }
];

const TestimonialCard = ({ testimonial, active }: { testimonial: typeof testimonials[0]; active: boolean }) => {
  return (
    <div 
      className={`absolute inset-0 transition-all duration-700 ease-out flex items-center ${
        active ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-[100px] z-0'
      }`}
    >
      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`}
                />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl font-medium mb-4">
              <Quote className="h-6 w-6 text-primary/40 mb-2 opacity-50" />
              {testimonial.quote}
            </blockquote>
            <div className="font-medium">{testimonial.name}</div>
            <div className="text-sm text-foreground/70">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('reveal-visible');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding" id="testimonials" ref={sectionRef}>
      <div className="app-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill bg-primary/10 text-primary mb-4 reveal">Success Stories</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal">
            Entrepreneurs Transforming Their Businesses
          </h2>
          <p className="text-lg text-foreground/70 reveal">
            Hear from founders who have leveraged our AI-powered platform to connect,
            learn, and grow their ventures.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[320px] md:h-[280px] reveal">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id}
                testimonial={testimonial}
                active={index === currentIndex}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8 reveal">
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-primary w-6' : 'bg-primary/30'
                  }`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
