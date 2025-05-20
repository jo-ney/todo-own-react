import { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/Todo';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., wait for assets or data)
    window.addEventListener("load", () => {
      // Give a small timeout if you want smoother transition
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // optional delay
    });
  }, []);

  return (
    <>
    {isLoading ? (
      <div className="loader-wrapper">
      <div className="spinner"></div>
    </div>
    ) : (
      <div className="app-content">
      <Todo/>
    </div>
    )}
  </>
  );
}

export default App;
