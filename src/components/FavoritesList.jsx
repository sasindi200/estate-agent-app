import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

const FavoriteItem = ({ property, onRemove }) => {
  const navigate = useNavigate();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'favorite',
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div 
      ref={drag}
      className={`favorite-item-custom ${isDragging ? 'dragging' : ''}`}
      onClick={() => navigate(`/property/${property.id}`)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={property.images[0]} alt={property.type} className="favorite-item-img" />
      <div className="favorite-item-info">
        <p className="favorite-item-price">Rs. {property.price.toLocaleString()}</p>
        <p className="favorite-item-location">{property.type} - {property.postcode}</p>
      </div>
      <button 
        className="favorite-item-remove-btn"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(property.id);
        }}
        aria-label="Remove from favorites"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

const FavoritesList = ({ favorites, onRemove, onClear, onAddToFavorites }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => {
      onAddToFavorites(item.property);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const [{ isOverRemove }, dropRemove] = useDrop(() => ({
    accept: 'favorite',
    drop: (item) => {
      onRemove(item.id);
    },
    collect: (monitor) => ({
      isOverRemove: monitor.isOver()
    })
  }));

  return (
    <div className="favorites-sidebar">
      <div className="favorites-sidebar-header">
        <h2>
          Favorites ({favorites.length})
        </h2>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="20" 
          height="20" 
          fill={favorites.length > 0 ? "#ef4444" : "none"} 
          stroke={favorites.length > 0 ? "#ef4444" : "#4b5563"} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>

      <div 
        ref={drop}
        className={`favorites-dropzone-container ${isOver ? 'drag-over' : ''} ${favorites.length > 0 ? 'has-items' : ''}`}
      >
        {favorites.length > 0 ? (
          <div className="favorites-items-list">
            {favorites.map(property => (
              <FavoriteItem 
                key={property.id}
                property={property}
                onRemove={onRemove}
              />
            ))}
            <button onClick={onClear} className="favorites-clear-all-btn">
              Clear All Favorites
            </button>
          </div>
        ) : (
          <div className="favorites-empty-state">
            <div className="drag-grip-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="5" r="1"></circle>
                <circle cx="9" cy="12" r="1"></circle>
                <circle cx="9" cy="19" r="1"></circle>
                <circle cx="15" cy="5" r="1"></circle>
                <circle cx="15" cy="12" r="1"></circle>
                <circle cx="15" cy="19" r="1"></circle>
              </svg>
            </div>
            <p>Drag properties here or click the heart icon to add favorites</p>
          </div>
        )}
      </div>

      <div 
        ref={dropRemove} 
        className={`favorites-remove-dropzone ${isOverRemove ? 'drag-over' : ''}`}
      >
        <p>Drag here to remove</p>
      </div>
    </div>
  );
};

export default FavoritesList;
