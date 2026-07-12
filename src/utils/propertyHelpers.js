// Helper functions for filtering and favorites management

export const filterProperties = (properties, criteria) => {
  return properties.filter(property => {
    // Type filter
    if (criteria.type && criteria.type !== 'any' && property.type.toLowerCase() !== criteria.type.toLowerCase()) {
      return false;
    }

    // Price filters
    if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
      return false;
    }
    if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
      return false;
    }

    // Bedroom filters
    if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
      return false;
    }
    if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
      return false;
    }

    // Postcode filter
    if (criteria.postcode && !property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())) {
      return false;
    }

    // Date filters
    if (criteria.dateFrom || criteria.dateTo) {
      const propertyDate = new Date(property.added.year, getMonthNumber(property.added.month) - 1, property.added.day);
      
      if (criteria.dateFrom) {
        const fromDate = new Date(criteria.dateFrom);
        if (propertyDate < fromDate) return false;
      }
      
      if (criteria.dateTo) {
        const toDate = new Date(criteria.dateTo);
        if (propertyDate > toDate) return false;
      }
    }

    return true;
  });
};

export const getMonthNumber = (monthName) => {
  const months = {
    'January': 1, 'February': 2, 'March': 3, 'April': 4,
    'May': 5, 'June': 6, 'July': 7, 'August': 8,
    'September': 9, 'October': 10, 'November': 11, 'December': 12
  };
  return months[monthName] || 1;
};

export const addToFavoritesIfNotDuplicate = (favorites, property) => {
  if (!favorites.find(fav => fav.id === property.id)) {
    return [...favorites, property];
  }
  return favorites;
};

export const removeFromFavorites = (favorites, propertyId) => {
  return favorites.filter(fav => fav.id !== propertyId);
};

export const clearAllFavorites = () => {
  return [];
};

export const sortProperties = (properties, sortBy) => {
  const getPropertyDate = (prop) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    const m = months[prop.added.month] || 0;
    return new Date(prop.added.year, m, prop.added.day);
  };

  return [...properties].sort((a, b) => {
    if (sortBy === 'newest') {
      return getPropertyDate(b) - getPropertyDate(a);
    } else if (sortBy === 'oldest') {
      return getPropertyDate(a) - getPropertyDate(b);
    } else if (sortBy === 'priceAsc') {
      return a.price - b.price;
    } else if (sortBy === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });
};
