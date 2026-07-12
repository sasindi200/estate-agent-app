import {
  filterProperties,
  getMonthNumber,
  addToFavoritesIfNotDuplicate,
  removeFromFavorites,
  clearAllFavorites,
  sortProperties,
} from '../utils/propertyHelpers';

describe('Property Helper Functions', () => {
  const mockProperties = [
    {
      id: 'prop1',
      type: 'House',
      bedrooms: 3,
      price: 500000,
      postcode: 'BR1',
      added: { month: 'January', day: 15, year: 2025 },
    },
    {
      id: 'prop2',
      type: 'Flat',
      bedrooms: 2,
      price: 300000,
      postcode: 'BR2',
      added: { month: 'March', day: 20, year: 2025 },
    },
    {
      id: 'prop3',
      type: 'House',
      bedrooms: 4,
      price: 700000,
      postcode: 'BR3',
      added: { month: 'June', day: 10, year: 2024 },
    },
  ];

  describe('getMonthNumber', () => {
    test('returns correct month number for valid month name', () => {
      expect(getMonthNumber('January')).toBe(1);
      expect(getMonthNumber('June')).toBe(6);
      expect(getMonthNumber('December')).toBe(12);
    });

    test('returns 1 for invalid month name', () => {
      expect(getMonthNumber('InvalidMonth')).toBe(1);
    });
  });

  describe('filterProperties - Single Criteria', () => {
    test('filters by property type', () => {
      const criteria = { type: 'house', minPrice: '', maxPrice: '', minBedrooms: '', maxBedrooms: '', postcode: '', dateFrom: '', dateTo: '' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('House');
      expect(result[1].type).toBe('House');
    });

    test('filters by minimum price', () => {
      const criteria = { type: '', minPrice: '400000', maxPrice: '', minBedrooms: '', maxBedrooms: '', postcode: '', dateFrom: '', dateTo: '' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(2);
      expect(result.every(p => p.price >= 400000)).toBe(true);
    });

    test('filters by maximum price', () => {
      const criteria = { type: '', minPrice: '', maxPrice: '400000', minBedrooms: '', maxBedrooms: '', postcode: '', dateFrom: '', dateTo: '' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(1);
      expect(result[0].price).toBe(300000);
    });

    test('filters by minimum bedrooms', () => {
      const criteria = { type: '', minPrice: '', maxPrice: '', minBedrooms: '3', maxBedrooms: '', postcode: '', dateFrom: '', dateTo: '' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(2);
      expect(result.every(p => p.bedrooms >= 3)).toBe(true);
    });

    test('filters by maximum bedrooms', () => {
      const criteria = { type: '', minPrice: '', maxPrice: '', minBedrooms: '', maxBedrooms: '2', postcode: '', dateFrom: '', dateTo: '' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(1);
      expect(result[0].bedrooms).toBe(2);
    });

    test('filters by postcode', () => {
      const criteria = { type: '', minPrice: '', maxPrice: '', minBedrooms: '', maxBedrooms: '', postcode: 'BR1', dateFrom: '', dateTo: '' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(1);
      expect(result[0].postcode).toBe('BR1');
    });
  });

  describe('filterProperties - Combined Criteria', () => {
    test('filters with price and bedroom combination', () => {
      const criteria = {
        type: '',
        minPrice: '300000',
        maxPrice: '600000',
        minBedrooms: '2',
        maxBedrooms: '3',
        postcode: '',
        dateFrom: '',
        dateTo: '',
      };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(2); // prop1 and prop2
      expect(result.every(p => p.price >= 300000 && p.price <= 600000)).toBe(true);
      expect(result.every(p => p.bedrooms >= 2 && p.bedrooms <= 3)).toBe(true);
    });

    test('filters with type, price, and postcode combination', () => {
      const criteria = {
        type: 'house',
        minPrice: '400000',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        postcode: 'BR1',
        dateFrom: '',
        dateTo: '',
      };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('prop1');
    });

    test('returns empty array when no properties match combined criteria', () => {
      const criteria = {
        type: 'flat',
        minPrice: '400000',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        postcode: '',
        dateFrom: '',
        dateTo: '',
      };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(0);
    });
  });

  describe('Favorites Management', () => {
    const mockFavorites = [
      { id: 'prop1', type: 'House', bedrooms: 3, price: 500000 },
    ];

    test('addToFavoritesIfNotDuplicate adds new property', () => {
      const newProperty = { id: 'prop2', type: 'Flat', bedrooms: 2, price: 300000 };
      const result = addToFavoritesIfNotDuplicate(mockFavorites, newProperty);
      expect(result).toHaveLength(2);
      expect(result[1].id).toBe('prop2');
    });

    test('addToFavoritesIfNotDuplicate prevents duplicate', () => {
      const duplicateProperty = { id: 'prop1', type: 'House', bedrooms: 3, price: 500000 };
      const result = addToFavoritesIfNotDuplicate(mockFavorites, duplicateProperty);
      expect(result).toHaveLength(1);
      expect(result).toEqual(mockFavorites);
    });

    test('removeFromFavorites removes property by id', () => {
      const result = removeFromFavorites(mockFavorites, 'prop1');
      expect(result).toHaveLength(0);
    });

    test('removeFromFavorites keeps other properties', () => {
      const favoritesWithMultiple = [
        { id: 'prop1', type: 'House', bedrooms: 3, price: 500000 },
        { id: 'prop2', type: 'Flat', bedrooms: 2, price: 300000 },
        { id: 'prop3', type: 'House', bedrooms: 4, price: 700000 },
      ];
      const result = removeFromFavorites(favoritesWithMultiple, 'prop2');
      expect(result).toHaveLength(2);
      expect(result.every(p => p.id !== 'prop2')).toBe(true);
    });

    test('clearAllFavorites returns empty array', () => {
      const result = clearAllFavorites();
      expect(result).toEqual([]);
    });
  });

  describe('filterProperties - Date Criteria', () => {
    test('filters properties added after dateFrom', () => {
      const criteria = { type: '', minPrice: '', maxPrice: '', minBedrooms: '', maxBedrooms: '', postcode: '', dateFrom: '2025-02-01', dateTo: '' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('prop2');
    });

    test('filters properties added before dateTo', () => {
      const criteria = { type: '', minPrice: '', maxPrice: '', minBedrooms: '', maxBedrooms: '', postcode: '', dateFrom: '', dateTo: '2024-12-31' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('prop3');
    });

    test('filters properties within date range (dateFrom and dateTo)', () => {
      const criteria = { type: '', minPrice: '', maxPrice: '', minBedrooms: '', maxBedrooms: '', postcode: '', dateFrom: '2025-01-01', dateTo: '2025-05-01' };
      const result = filterProperties(mockProperties, criteria);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('prop1');
      expect(result[1].id).toBe('prop2');
    });
  });

  describe('sortProperties', () => {
    test('sorts by newest first', () => {
      const result = sortProperties(mockProperties, 'newest');
      expect(result[0].id).toBe('prop2');
      expect(result[1].id).toBe('prop1');
      expect(result[2].id).toBe('prop3');
    });

    test('sorts by oldest first', () => {
      const result = sortProperties(mockProperties, 'oldest');
      expect(result[0].id).toBe('prop3');
      expect(result[1].id).toBe('prop1');
      expect(result[2].id).toBe('prop2');
    });

    test('sorts by price ascending', () => {
      const result = sortProperties(mockProperties, 'priceAsc');
      expect(result[0].price).toBe(300000);
      expect(result[1].price).toBe(500000);
      expect(result[2].price).toBe(700000);
    });

    test('sorts by price descending', () => {
      const result = sortProperties(mockProperties, 'priceDesc');
      expect(result[0].price).toBe(700000);
      expect(result[1].price).toBe(500000);
      expect(result[2].price).toBe(300000);
    });
  });
});

