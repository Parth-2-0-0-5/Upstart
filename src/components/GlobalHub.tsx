
import React, { useEffect, useRef } from 'react';
import { Globe, MessageSquare, Video, Users, ArrowRight } from 'lucide-react';

const GlobalHub = () => {
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

  return (
    <section className="section-padding bg-gradient-to-b from-secondary/30 to-white" ref={sectionRef}>
      <div className="app-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="pill bg-primary/10 text-primary mb-4 reveal">Global Network</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal">
              Collaborate with Entrepreneurs Worldwide
            </h2>
            <p className="text-lg text-foreground/70 mb-6 reveal">
              Connect with like-minded entrepreneurs from around the world,
              share insights, and build powerful business relationships.
            </p>
            
            <div className="space-y-4 mb-8 reveal">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Live Chat & Messaging</h4>
                  <p className="text-sm text-foreground/70">Connect instantly with entrepreneurs and mentors</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Video Conferences</h4>
                  <p className="text-sm text-foreground/70">Host and join video meetings with up to 50 participants</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Industry Groups</h4>
                  <p className="text-sm text-foreground/70">Join specialized communities for your specific industry</p>
                </div>
              </div>
            </div>
            
            <a href="#cta" className="btn-primary reveal">
              <span>Join Network</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="lg:col-span-3 relative reveal">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
            <div className="relative glass rounded-2xl h-[400px] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="w-[90%] h-[90%] relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                  
                  <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 text-primary/20 animate-spin-slow" />
                  
                  <div className="absolute top-[15%] left-[20%] w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white animate-float">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop&crop=face"
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  <div className="absolute top-[25%] right-[15%] w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white animate-float" style={{ animationDelay: '0.5s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop&crop=face"
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  <div className="absolute bottom-[20%] right-[25%] w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white animate-float" style={{ animationDelay: '1s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&h=400&auto=format&fit=crop&crop=face"
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  <div className="absolute bottom-[15%] left-[30%] w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white animate-float" style={{ animationDelay: '1.5s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop&crop=face"
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  <div className="absolute top-[50%] left-[10%] w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white animate-float" style={{ animationDelay: '2s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&h=400&auto=format&fit=crop&crop=face"
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  <div className="absolute top-[60%] right-[10%] w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white animate-float" style={{ animationDelay: '2.5s' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop&crop=face"
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Global Network</h4>
                    <p className="text-sm text-foreground/70">4,823 entrepreneurs online now</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?q=80&w=100&h=100&auto=format&fit=crop&crop=face`}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-xs text-white font-medium">
                      +4k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalHub;
