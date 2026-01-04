import React from 'react';
import { useDrop, useDrag } from 'react-dnd';

const FavoriteItem = ({ property, onRemove, onSelect }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'favorite',
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div 
      ref = {drag}
      className = "favorite-item"
      onClick = {() => onSelect(property)}
      style = {{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={property.images[0]} alt={property.type} />
      <div className ="favorite-info">
        <p className = "favorite-price">£{property.price.toLocaleString()}</p>
        <p className = "favorite-location">{property.postcode}</p>
      </div>
      <button 
        className="remove-btn"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(property.id);
        }}
      >
        ×
      </button>
    </div>
  );
};

const FavoritesList = ({ favorites, onRemove, onClear, onSelectProperty }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => {
      // Property automatically added via PropertyCard
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const [, dropRemove] = useDrop(() => ({
    accept: 'favorite',
    drop: (item) => {
      onRemove(item.id);
    }
  }));

  return (
    <div className = "favorites-container">
      <div className= "favorites-header">
        <h2>Favorites ({favorites.length})</h2>
        {favorites.length > 0 && (
          <button onClick={onClear} className="clear-btn">Clear All</button>
        )}
      </div>

      <div 
        ref = {drop}
        className = {`favorites-list ${isOver ? 'drop-active' : ''}`}
      >
        {favorites.length > 0 ? (
          favorites.map(property => (
            <FavoriteItem 
              key = {property.id}
              property = {property}
              onRemove = {onRemove}
              onSelect = {onSelectProperty}
            />
          ))
        ) : (
          <p className="empty-message">
            Drag properties here or click the star icon to add favorites
          </p>
        )}
      </div>

      <div ref = {dropRemove} className = "drop-zone-remove">
        <p>Drag here to remove</p>
      </div>
    </div>
  );
};

export default FavoritesList;
