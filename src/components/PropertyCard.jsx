import React from 'react';
import { useDrag } from 'react-dnd';

const PropertyCard = ({ property, onAddToFavorites, isFavorite }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToFavorites(property);
  };

  return (
    <div 
      ref={drag}
      className={`property-card-custom ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="property-card-image-wrapper">
        <img src={property.images[0]} alt={property.type} className="property-card-image" />
        {property.id === 'prop1' && (
          <span className="new-listing-badge">NEW LISTING</span>
        )}
        <button 
          className={`card-favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="18" 
            height="18" 
            fill={isFavorite ? "#ef4444" : "none"} 
            stroke={isFavorite ? "#ef4444" : "currentColor"} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="property-card-info">
        {property.price && (
          <h3 className="property-card-price">Rs. {property.price.toLocaleString()}</h3>
        )}
        <h4 className="property-card-title">{property.type} - Bedroom</h4>
        
        <p className="property-card-location">
          <svg className="location-pin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {property.location.split(',').slice(0, 3).join(',') + ' ' + property.postcode}
        </p>
        
        <p className="property-card-description">
          {property.description.substring(0, 105)}...
        </p>
        
        <hr className="property-card-divider" />
        
        <div className="property-card-footer">
          <span className="property-card-added">
            ADDED: {property.added.month.toUpperCase()} {property.added.day}, {property.added.year}
          </span>
          <div className="property-card-specs">
            {property.bedrooms && (
              <div className="property-card-spec-item">
                <svg className="spec-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"></path>
                  <path d="M5 17h14"></path>
                  <path d="M9 11v6"></path>
                  <path d="M15 11v6"></path>
                </svg>
                <span className="spec-value">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="property-card-spec-item">
                <svg className="spec-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6v3h6V6"></path>
                  <path d="M2 17h20"></path>
                  <path d="M4 17a4 4 0 0 1-4-4h24a4 4 0 0 1-4 4"></path>
                </svg>
                <span className="spec-value">{property.bathrooms}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
