import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyCard from './PropertyCard';

// Mock react-dnd since it has ES module issues in Jest
jest.mock('react-dnd', () => ({
  useDrag: () => [
    { isDragging: false },
    jest.fn(),
  ],
}));

describe('PropertyCard Component - UI Rendering', () => {
  const mockProperty = {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    bathrooms: 2,
    price: 500000,
    description: 'A beautiful property in a quiet area.',
    location: 'London, UK, SW1',
    postcode: 'SW1',
    added: {
      month: 'January',
      day: 15,
      year: 2025
    },
    images: ['/images/prop1_1.jpg' ]
  };

  test('renders property text content correctly', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        onAddToFavorites={jest.fn()} 
        isFavorite={false} 
      />
    );
    
    // Check price (formatted with locale string)
    expect(screen.getByText(/500,000/)).toBeInTheDocument();
    // Check type
    expect(screen.getByText(/House/)).toBeInTheDocument();
    // Check location
    expect(screen.getByText(/London, UK/)).toBeInTheDocument();
    // Check description substring
    expect(screen.getByText(/A beautiful property in a quiet area/)).toBeInTheDocument();
    // Check added date
    expect(screen.getByText(/ADDED: JANUARY 15, 2025/)).toBeInTheDocument();
  });

  test('correctly renders bedroom and bathroom numbers', () => {
    const singleBedProperty = {
      ...mockProperty,
      bedrooms: 1,
      bathrooms: 1
    };

    const { container } = render(
      <PropertyCard 
        property={singleBedProperty} 
        onAddToFavorites={jest.fn()} 
        isFavorite={false} 
      />
    );
    
    // In PropertyCard, bedroom and bathroom numbers are rendered inside elements with class spec-value
    const specValues = container.querySelectorAll('.spec-value');
    expect(specValues[0]).toHaveTextContent('1'); // bedrooms
    expect(specValues[1]).toHaveTextContent('1'); // bathrooms
  });

  test('calls onAddToFavorites when favorite button is clicked', async () => {
    const mockOnAddToFavorites = jest.fn();
    render(
      <PropertyCard 
        property={mockProperty} 
        onAddToFavorites={mockOnAddToFavorites} 
        isFavorite={false} 
      />
    );

    const favoriteButton = screen.getByRole('button', { name: /Add to favorites/i });
    await userEvent.click(favoriteButton);
    expect(mockOnAddToFavorites).toHaveBeenCalledTimes(1);
    expect(mockOnAddToFavorites).toHaveBeenCalledWith(mockProperty);
  });

  test('displays different aria-label and styling class when isFavorite is true', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        onAddToFavorites={jest.fn()} 
        isFavorite={true} 
      />
    );

    const favoriteButton = screen.getByRole('button', { name: /Remove from favorites/i });
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveClass('active');
  });
});
