
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">404</h1>
        <p className="text-xl text-foreground mb-8">Sorry, we couldn't find the page you're looking for.</p>
        <a 
          href="/" 
          className="btn-primary inline-flex"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Return to Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
