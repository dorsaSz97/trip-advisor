import attractionsImg from '../assets/attractions.webp';
import restaurantsImg from '../assets/restaurants.webp';
import hotelsImg from '../assets/hotels.webp';
import hotelImg from '../assets/home.svg';
import restaurantImg from '../assets/cutlery.svg';
import attractionImg from '../assets/pin.svg';

export const DETAILS = [
  { category: 'catering', verb: 'eat', imageUrl: restaurantsImg },
  { category: 'accommodation.hotel', verb: 'stay', imageUrl: hotelsImg },
  { category: 'tourism.attraction', verb: 'visit', imageUrl: attractionsImg },
];

export const MAX_ITEMS = 20;

export const ZOOM_LEVEL = 14;
export const TILE_IMAGE = {
  url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  attr: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
};

export const NAV_LINKS = [
  { text: 'hotels', category: 'accommodation.hotel', logo: hotelImg },
  { text: 'restaurants', category: 'catering', logo: restaurantImg },
  {
    text: 'tourist sites',
    category: 'tourism.attraction',
    logo: attractionImg,
  },
];
