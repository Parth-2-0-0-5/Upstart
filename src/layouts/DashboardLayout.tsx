
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { 
  Home, User, MessageSquare, BookOpen, 
  BarChart2, DollarSign, Search, Users, 
  FileCheck, Calculator, Menu, X, Bell 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Mock unread messages count
  const unreadMessages = 2;

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Mentors & Investors', href: '/matching', icon: Users },
    { name: 'Knowledge Hub', href: '/knowledge-hub', icon: BookOpen },
    { name: 'Business Validator', href: '/business-validator', icon: FileCheck },
    { name: 'Collaboration', href: '/collaboration', icon: Users },
    { name: 'Pitch Evaluator', href: '/pitch-evaluator', icon: BarChart2 },
    { name: 'Competitor Analysis', href: '/competitor-benchmarking', icon: Search },
    { name: 'Valuation Calculator', href: '/valuation-calculator', icon: Calculator },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-lg transition-transform duration-300 transform md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 pt-4">
            <a href="/" className="text-xl font-medium text-foreground">
              Upstart
            </a>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="space-y-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-md group",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 mr-3"></div>
              <div>
                <p className="text-sm font-medium">Krishna Garg</p>
                <p className="text-xs text-muted-foreground">Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top navbar */}
        <header className="bg-card/50 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex-1 flex justify-end items-center space-x-4">
              <Link to="/messages" className="p-2 rounded-md hover:bg-accent relative">
                <MessageSquare className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center"
                  >
                    {unreadMessages}
                  </Badge>
                )}
              </Link>
              <Link to="/profile" className="p-2 rounded-md hover:bg-accent">
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
