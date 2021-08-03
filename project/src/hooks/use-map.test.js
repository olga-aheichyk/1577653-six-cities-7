import { renderHook } from '@testing-library/react-hooks';
import useMap from './use-map.js';

const testLocation = {
  latitude: 52.3909553943508,
  longitude: 4.85309666406198,
  zoom: 8,
};

let location = null;
let mapRef = null;

describe('Hook useMap:', () => {
  beforeAll(() => {
    mapRef = {
      current: true,
    };
    location = testLocation;

    jest.mock('leaflet', () => ({
      map: jest.fn(),
    }));
  });

  it('should return object with map', () => {
    const {result} = renderHook(() =>
      useMap(mapRef, location),
    );

    expect(result).toBeInstanceOf(Object);
  });
});
