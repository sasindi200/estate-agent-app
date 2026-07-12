import React, { useState } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Button 
} from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleReset = () => {
    const resetData = {
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateFrom: '',
      dateTo: ''
    };
    setFormData(resetData);
    onSearch(resetData);
  };

  return (
    <div className="search-section">
      <div className="search-banner">
        <h1>Find Your Dream Property</h1>
        <p>Search properties by type, price, bedrooms, location, and date to discover the perfect home for your future.</p>
      </div>
      <div className="search-card-wrapper">
        <form onSubmit={handleSubmit} className="search-form-custom">
          <div className="search-grid">
            <div className="search-field">
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="type-label">PROPERTY TYPE</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="PROPERTY TYPE"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="flat">Flat</MenuItem>
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="villa">Villa</MenuItem>
                  <MenuItem value="townhouse">Townhouse</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="search-field">
              <TextField
                fullWidth
                size="small"
                id="minPrice"
                name="minPrice"
                label="MIN PRICE (RS.)"
                type="number"
                value={formData.minPrice}
                onChange={handleChange}
                placeholder="No minimum"
                inputProps={{ min: 0 }}
              />
            </div>

            <div className="search-field">
              <TextField
                fullWidth
                size="small"
                id="maxPrice"
                name="maxPrice"
                label="MAX PRICE (RS.)"
                type="number"
                value={formData.maxPrice}
                onChange={handleChange}
                placeholder="No maximum"
                inputProps={{ min: 0 }}
              />
            </div>

            <div className="search-field">
              <TextField
                fullWidth
                size="small"
                id="postcode"
                name="postcode"
                label="POSTCODE AREA"
                type="text"
                value={formData.postcode}
                onChange={handleChange}
                placeholder="e.g. BR1, NW1"
              />
            </div>

            <div className="search-field">
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="min-bedrooms-label">MIN BEDROOMS</InputLabel>
                <Select
                  labelId="min-bedrooms-label"
                  id="minBedrooms"
                  name="minBedrooms"
                  value={formData.minBedrooms}
                  onChange={handleChange}
                  label="MIN BEDROOMS"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="search-field">
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="max-bedrooms-label">MAX BEDROOMS</InputLabel>
                <Select
                  labelId="max-bedrooms-label"
                  id="maxBedrooms"
                  name="maxBedrooms"
                  value={formData.maxBedrooms}
                  onChange={handleChange}
                  label="MAX BEDROOMS"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="search-field">
              <TextField
                fullWidth
                size="small"
                id="dateFrom"
                name="dateFrom"
                label="ADDED AFTER"
                type="date"
                value={formData.dateFrom}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className="search-field">
              <TextField
                fullWidth
                size="small"
                id="dateTo"
                name="dateTo"
                label="ADDED BEFORE"
                type="date"
                value={formData.dateTo}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <div className="search-actions">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                fontFamily: 'var(--primary-font)',
                borderRadius: '8px',
                px: 4
              }}
            >
              Search Properties
            </Button>
            <Button 
              type="button" 
              onClick={handleReset} 
              variant="outlined" 
              color="inherit"
              size="large"
              sx={{ 
                textTransform: 'none',
                fontWeight: 500,
                fontFamily: 'var(--primary-font)',
                borderRadius: '8px',
                borderColor: 'var(--border-color)',
                color: 'var(--text-medium)',
                '&:hover': {
                  borderColor: 'var(--text-light)',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)'
                },
                px: 4
              }}
            >
              Reset Filters
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
