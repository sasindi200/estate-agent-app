import React, { useState } from 'react';

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
    <section className = "search-container">
      <h1>Find Your Dream Property</h1>
      <h3>Search properties by type, price, bedrooms, location, and date</h3>
      
      <form onSubmit=  {handleSubmit}  className= "search-form" >
        <div className= "form-row">
          <div className  =" form-group">
            <label htmlFor= "type">Property Type</label>
            <select 
              id= "type" 
              name= "type" 
              value= {formData.type}
              onChange= {handleChange}
              className= "form-control"
            >
              <option value = "" >Any</option>
              <option value = "house">House</option>
              <option value = "flat">Flat</option>
              <option value = "apartment">Apartment</option>
              <option value = "villa">Villa</option>
              <option value = "townhouse">Townhouse</option>

            </select>
          </div>

          <div className = "form-group">
            <label htmlFor= "minPrice" >Min Price (£)</label>
            <input 
              type="number" 
              id= "minPrice" 
              name="minPrice"
              value= {formData.minPrice}
              onChange=  {handleChange}
              placeholder= "No minimum"
              className=  "form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (£)</label>
            <input 
              type="number" 
              id="maxPrice" 
              name="maxPrice"
              value = {formData.maxPrice}
              onChange={handleChange}
              placeholder= "No maximum"
              className= "form-control"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms</label>
            <input 
              type="number" 
              id="minBedrooms" 
              name="minBedrooms"
              value={formData.minBedrooms}
              onChange={handleChange}
              min="0"
              placeholder="Any"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxBedrooms">Max Bedrooms</label>
            <input 
              type="number" 
              id="maxBedrooms" 
              name="maxBedrooms"
              value={formData.maxBedrooms}
              onChange={handleChange}
              min="0"
              placeholder="Any"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="postcode">Postcode Area </label>
            <input 
              type="text" 
              id="postcode" 
              name="postcode"
              value={formData.postcode}
              onChange= {handleChange}
              placeholder="e.g. BR1, NW1"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateFrom">Added After</label>
            <input 
              type="date" 
              id="dateFrom" 
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateTo">Added Before</label>
            <input 
              type="date" 
              id="dateTo" 
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">Search Properties</button>
          <button type="button" onClick={handleReset} className="btn btn-secondary"> Reset Filters</button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
