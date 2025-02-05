import React from 'react';
import ColdRoomTracker from './components/ColdRoomTracker';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Coldroom Produce Tracking System
        </h1>
        <ColdRoomTracker />
      </div>
    </div>
  );
}

export default App; 