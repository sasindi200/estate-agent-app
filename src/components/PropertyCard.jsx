import React from 'react';
import { useDrag } from 'react-dnd';

const PropertyCard = ({ property, onSelect, onAddToFavorites, isFavorite }) =>{
  const [{ isDragging }, drag] = useDrag(() => ({
    type : 'property',
    item: { property },
    collect: (monitor) => ({
      isDragging:  monitor.isDragging()
    })
  }));

  const handleFavoriteClick =(e) => {
    e.stopPropagation();
    onAddToFavorites(property);
  };

  return (
    <div 
      ref = {drag}
      className = {`property-card ${isDragging ? 'dragging' : ''}`}
      onClick = {() => onSelect(property)}
      style = {{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className ="property-image">
        <img src = {property.images[0]} alt = {property.type} />
        <button 
          className = {`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick = {handleFavoriteClick}
          title = {isFavorite ? 'Already in favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <div className = "property-details">
        <h3>£{property.price.toLocaleString()} </h3>
        <p className = "property-type">{property.type} - {property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</p>
        <p className = "property-location">{property.location}</p>
        <p className = "property-description">{property.description.substring(0, 100)}...</p>
        <p className = "property-added">Added: {property.added.month} {property.added.day}, {property.added.year}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
