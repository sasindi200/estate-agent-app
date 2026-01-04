import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchBar from './components/SearchBar';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import FavoritesList from './components/FavoritesList';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: '',
    dateTo: ''
  });

  // Load properties from JSON
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/properties.json');
        const data = await response.json();
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      } catch (error) {
        console.error('Error loading properties:', error);
      }
    };
    fetchProperties();
  }, []);

  // Search/Filter function
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    
    const filtered = properties.filter(property => {
      // Type filter
      if (criteria.type && criteria.type !== 'any' && property.type.toLowerCase() !== criteria.type.toLowerCase()) {
        return false;
      }

      // Price filters
      if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
        return false;
      }
      if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
        return false;
      }

      // Bedroom filters
      if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
        return false;
      }
      if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
        return false;
      }

      // Postcode filter
      if (criteria.postcode && !property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())) {
        return false;
      }

      // Date filters
      if (criteria.dateFrom || criteria.dateTo) {
        const propertyDate = new Date(property.added.year, getMonthNumber(property.added.month) - 1, property.added.day);
        
        if (criteria.dateFrom) {
          const fromDate = new Date(criteria.dateFrom);
          if (propertyDate < fromDate) return false;
        }
        
        if (criteria.dateTo) {
          const toDate = new Date(criteria.dateTo);
          if (propertyDate > toDate) return false;
        }
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

  const getMonthNumber = (monthName) => {
    const months = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4,
      'May': 5, 'June': 6, 'July': 7, 'August': 8,
      'September': 9, 'October': 10, 'November': 11, 'December': 12
    };
    return months[monthName] || 1;
  };

  // Add to favorites
  const addToFavorites = (property) => {
    if (!favorites.find(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <SearchBar onSearch={handleSearch} />
        
        {selectedProperty ? (
          <PropertyDetails 
            property={selectedProperty}
            onBack={() => setSelectedProperty(null)}
            onAddToFavorites={addToFavorites}
            isFavorite={favorites.some(fav => fav.id === selectedProperty.id)}
          />
        ) : (
          <div className="main-container">
            <PropertyList 
              properties={filteredProperties}
              onSelectProperty={setSelectedProperty}
              onAddToFavorites={addToFavorites}
              favorites={favorites}
            />
            <FavoritesList 
              favorites={favorites}
              onRemove={removeFromFavorites}
              onClear={clearFavorites}
              onSelectProperty={setSelectedProperty}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default App;
