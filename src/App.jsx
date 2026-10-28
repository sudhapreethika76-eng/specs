import React from 'react';
import Home from './components/Home.jsx';
import { SmoothScrollProvider } from './components/SmoothScroll.jsx';

function App() {
  return (
    <SmoothScrollProvider>
      <Home />
    </SmoothScrollProvider>
  );
}

export default App;
