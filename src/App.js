import { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/Todo';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      // Give a small timeout if you want smoother transition
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 800); // optional delay

    return () => clearTimeout(timeout);
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
