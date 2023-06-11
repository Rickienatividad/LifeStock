import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/Weather';

jest.mock('axios');

describe('WeatherCard', () => {
  it('renders without crashing', () => {
    render(<WeatherCard />);
  });

  it('displays loading state', () => {
    render(<WeatherCard />);
    expect(screen.getByText('Loading weather data...')).toBeInTheDocument();
  });
});
