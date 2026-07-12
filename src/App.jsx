import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchBar from './components/SearchBar';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import FavoritesList from './components/FavoritesList';
import { filterProperties, addToFavoritesIfNotDuplicate, removeFromFavorites, clearAllFavorites, sortProperties } from './utils/propertyHelpers';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function PropertyDetailPageContent({ properties, addToFavorites, favorites }) {
  const { id } = useParams();
  const property = properties.find(prop => prop.id === id);

  if (!property) {
    return (
      <div className="App">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Property not found</h2>
          <a href="/">← Back to Search</a>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <PropertyDetails 
        property={property}
        onAddToFavorites={addToFavorites}
        isFavorite={favorites.some(fav => fav.id === property.id)}
      />
    </div>
  );
}

function SearchContent({ properties, filteredProperties, favorites, onSearch, addToFavorites, removeFavoritesFromList, clearFavorites, sortBy, onSortChange }) {
  return (
    <div className="App">
      <SearchBar onSearch={onSearch} />
      <div className="main-container">
        <PropertyList 
          properties={filteredProperties}
          onAddToFavorites={addToFavorites}
          favorites={favorites}
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
        <FavoritesList 
          favorites={favorites}
          onRemove={removeFavoritesFromList}
          onClear={clearFavorites}
          onAddToFavorites={addToFavorites}
        />
      </div>
    </div>
  );
}

function AppContent() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
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
        const response = await fetch(`${import.meta.env.BASE_URL}properties.json`);
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
    const filtered = filterProperties(properties, criteria);
    setFilteredProperties(filtered);
  };

  // Add to favorites
  const addToFavorites = (property) => {
    setFavorites(addToFavoritesIfNotDuplicate(favorites, property));
  };

  // Remove from favorites
  const removeFavoritesFromList = (propertyId) => {
    setFavorites(removeFromFavorites(favorites, propertyId));
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites(clearAllFavorites());
  };

  const sortedProperties = sortProperties(filteredProperties, sortBy);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SearchContent 
            properties={properties}
            filteredProperties={sortedProperties}
            favorites={favorites}
            onSearch={handleSearch}
            addToFavorites={addToFavorites}
            removeFavoritesFromList={removeFavoritesFromList}
            clearFavorites={clearFavorites}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        }
      />
      <Route
        path="/property/:id"
        element={
          <PropertyDetailPageContent 
            properties={properties}
            addToFavorites={addToFavorites}
            favorites={favorites}
          />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <Router>
          <AppContent />
        </Router>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
