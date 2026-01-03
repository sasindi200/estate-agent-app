
import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, onSelectProperty, onAddToFavorites, favorites }) => {
  return (
    <div className = "property-list-container">
      <h2>Available Properties ({properties.length})</h2>
      <div className = "property-grid">
        {properties.length > 0 ? (
          properties.map(property => (
            <PropertyCard 
              key = {property.id}
              property = {property}
              onSelect = {onSelectProperty}
              onAddToFavorites = {onAddToFavorites}
              isFavorite = {favorites.some(fav => fav.id === property.id)}
            />
          ))
        ) : (
          <p className = "no-results" >No properties found matching your criteria. Try adjusting your search filters.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
