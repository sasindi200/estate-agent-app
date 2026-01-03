import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PropertyList from './components/PropertyList';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/properties.json');
        const data = await response.json();
        const list = data.properties || data;
        setProperties(list);
        setFilteredProperties(list);
 // Show all initially
      } catch (error) {
        console.error('Error loading properties:', error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className = "App">
      <SearchBar />
      <PropertyList properties={filteredProperties} />
    </div>
  );
}

export default App;
