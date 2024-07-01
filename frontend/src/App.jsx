import React from 'react';
import FoodtruckTable from './components/FoodtruckTable';

function App() {
    return (
        <div className="container w-full">
            <header className="w-full py-4 header">
                <h1 className="text-4xl font-bold mb-2 text-center text-white">FoodTruck Finder</h1>
                <h2 className="text-xl text-gray-200 mb-8 text-center">engineering-assessment</h2>
            </header>
            <div className="w-full max-w-6xl shadow-md rounded-lg p-6 mt-4 content">
                <FoodtruckTable />
            </div>
        </div>
    );
}

export default App;
