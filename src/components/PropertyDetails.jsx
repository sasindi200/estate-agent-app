import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PropertyDetails = ({ property, onBack, onAddToFavorites, isFavorite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="property-details-container">
      <button onClick={onBack} className="back-btn">← Back to Search</button>
      
      <div className="property-header">
        <h1>Rs. {property.price.toLocaleString()}</h1>
        <button 
          onClick={() => onAddToFavorites(property)}
          className={`favorite-btn-large ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '★ Saved' : '☆ Save Property'}
        </button>
      </div>

      <div className="property-quick-info">
        <span>{property.type}</span>
        <span>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
        <span>{property.location}</span>
      </div>

      <div className="image-gallery">
        <div className="main-image-container">
          <button className="image-nav prev" onClick={handlePrevImage}>‹</button>
          <img 
            src={property.images[currentImageIndex]} 
            alt={`Property ${currentImageIndex + 1}`}
            className="main-image"
          />
          <button className="image-nav next" onClick={handleNextImage}>›</button>
        </div>

        <div className="thumbnail-container">
          {property.images.map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      <Tabs className="property-tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Location Map</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-content">
            <h2>Property Description</h2>
            <p>{property.longDescription || property.description}</p>
            <div className="property-features">
              <h3>Key Features</h3>
              <ul>
                <li>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</li>
                <li>{property.type}</li>
                <li>{property.tenure}</li>
                <li>Added: {property.added.month} {property.added.day}, {property.added.year}</li>
              </ul>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content">
            <h2>Floor Plan</h2>
            <img 
              src={property.floorPlan || property.images[0]} 
              alt="Floor plan"
              className="floor-plan-image"
            />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content">
            <h2>Location</h2>
            <p><strong>Address:</strong> {property.location}</p>
            <div className="map-container">
              <iframe
                src={property.mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Property location map"
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
