
import React, { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (pressed: boolean) => {
    toggleDarkMode();
    
    // Create the circular animation overlay
    if (toggleRef.current) {
      const toggleRect = toggleRef.current.getBoundingClientRect();
      const circle = document.createElement('div');
      
      // Get the maximum screen dimension for circle size
      const maxDimension = Math.max(
        window.innerWidth,
        window.innerHeight
      ) * 2;
      
      // Position the circle at the toggle button center
      circle.style.position = 'fixed';
      circle.style.top = `${toggleRect.top + toggleRect.height / 2}px`;
      circle.style.left = `${toggleRect.left + toggleRect.width / 2}px`;
      circle.style.width = '0';
      circle.style.height = '0';
      circle.style.borderRadius = '50%';
      circle.style.transform = 'translate(-50%, -50%)';
      circle.style.pointerEvents = 'none';
      circle.style.zIndex = '9999';
      
      // Set the background color based on the new theme
      circle.style.backgroundColor = pressed ? 'var(--background)' : 'var(--card)';
      document.body.appendChild(circle);
      
      // Animate the circle expansion
      circle.animate(
        [
          { width: '0', height: '0' },
          { width: `${maxDimension}px`, height: `${maxDimension}px` }
        ],
        {
          duration: 600,
          easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }
      ).onfinish = () => {
        document.body.removeChild(circle);
      };
    }
  };

  return (
    <Toggle
      aria-label="Toggle dark mode"
      className="p-2 rounded-md hover:bg-accent"
      pressed={isDarkMode}
      onPressedChange={handleToggle}
      ref={toggleRef}
    >
      {isDarkMode ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
