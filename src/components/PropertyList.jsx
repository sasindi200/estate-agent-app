import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, onAddToFavorites, favorites, sortBy, onSortChange }) => {
  return (
    <div className="property-list-container">
      <div className="property-list-header">
        <h2>Available Properties ({properties.length})</h2>
        <div className="sort-container">
          <svg className="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
            aria-label="Sort properties"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="priceAsc">Sort: Price (Low to High)</option>
            <option value="priceDesc">Sort: Price (High to Low)</option>
          </select>
        </div>
      </div>
      <div className="property-grid">
        {properties.length > 0 ? (
          properties.map(property => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              style={{ textDecoration: 'none' }}
            >
              <PropertyCard 
                property={property}
                onAddToFavorites={onAddToFavorites}
                isFavorite={favorites.some(fav => fav.id === property.id)}
              />
            </Link>
          ))
        ) : (
          <p className="no-results">No properties found matching your criteria. Try adjusting your search filters.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
