import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PropertyDetails = ({ property, onAddToFavorites, isFavorite }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
    <div className="property-details-container-custom">
      <button onClick={() => navigate('/')} className="back-to-search-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Search
      </button>
      
      <div className="property-details-header">
        <div className="details-title-section">
          <h1>Rs. {property.price.toLocaleString()}</h1>
          <div className="details-quick-info">
            <span className="details-type-tag">{property.type}</span>
            <span className="details-bedroom-tag">{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
            {property.bathrooms && (
              <span className="details-bathroom-tag">{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
        <button 
          onClick={() => onAddToFavorites(property)}
          className={`details-favorite-btn-large ${isFavorite ? 'active' : ''}`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="18" 
            height="18" 
            fill={isFavorite ? "#ffffff" : "none"} 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {isFavorite ? 'Saved to Favorites' : 'Save Property'}
        </button>
      </div>

      <p className="details-location-text">
        <svg className="location-pin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        {property.location}
      </p>

      <div className="details-image-gallery">
        <div className="details-main-image-container">
          <button className="details-image-nav prev" onClick={handlePrevImage} aria-label="Previous image">‹</button>
          <img 
            src={property.images[currentImageIndex]} 
            alt={`Property view ${currentImageIndex + 1}`}
            className="details-main-image"
            onClick={() => setIsLightboxOpen(true)}
            style={{ cursor: 'zoom-in' }}
            title="Click to view full screen"
          />
          <button className="details-image-nav next" onClick={handleNextImage} aria-label="Next image">›</button>
          <div className="gallery-counter">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>

        <div className="details-thumbnail-container">
          {property.images.map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={`Thumbnail view ${index + 1}`}
              className={`details-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      <Tabs className="details-property-tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Location Map</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-panel-content">
            <h2>Property Description</h2>
            <p className="long-description-text">{property.longDescription || property.description}</p>
            <div className="details-property-features">
              <h3>Key Details & Features</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <span className="feature-label">Property Type</span>
                  <span className="feature-value">{property.type}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-label">Bedrooms</span>
                  <span className="feature-value">{property.bedrooms}</span>
                </div>
                {property.bathrooms && (
                  <div className="feature-item">
                    <span className="feature-label">Bathrooms</span>
                    <span className="feature-value">{property.bathrooms}</span>
                  </div>
                )}
                <div className="feature-item">
                  <span className="feature-label">Tenure</span>
                  <span className="feature-value">{property.tenure}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-label">Added Date</span>
                  <span className="feature-value">{property.added.month} {property.added.day}, {property.added.year}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-label">Postcode Area</span>
                  <span className="feature-value">{property.postcode}</span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-panel-content">
            <h2>Floor Plan</h2>
            <div className="floorplan-image-container">
              <img 
                src={property.floorPlan || property.images[0]} 
                alt="Floor plan layout"
                className="details-floor-plan-image"
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-panel-content">
            <h2>Location Map</h2>
            <p className="map-address-label"><strong>Address:</strong> {property.location}</p>
            <div className="details-map-container">
              <iframe
                src={property.mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Property location map iframe"
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-modal" onClick={() => setIsLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)} aria-label="Close lightbox">&times;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-nav prev" onClick={handlePrevImage} aria-label="Previous image">&#8249;</button>
            <div className="lightbox-image-wrapper">
              <img 
                src={property.images[currentImageIndex]} 
                alt={`Fullscreen view ${currentImageIndex + 1}`}
                className="lightbox-image"
              />
              <div className="lightbox-caption">
                Image {currentImageIndex + 1} of {property.images.length}
              </div>
            </div>
            <button className="lightbox-nav next" onClick={handleNextImage} aria-label="Next image">&#8250;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
