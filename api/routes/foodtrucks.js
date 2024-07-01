const express = require('express');
const router = express.Router();
const axios = require('axios');
const csv = require('csvtojson');
const cache = require('../utils/cache');

const FOODTRUCKS_URL = 'https://data.sfgov.org/api/views/rqzj-sfat/rows.csv?accessType=DOWNLOAD';

// Function to obtain coordinates from the address using Nominatim
const getCoordinates = async (address) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1
      }
    });
    if (response.data.length > 0) {
      const location = response.data[0];
      return { lat: location.lat, lng: location.lon };
    } else {
      return { lat: 0, lng: 0 };
    }
  } catch (error) {
    console.error(`Erro ao geocodificar endereço: ${address}`, error);
    return { lat: 0, lng: 0 };
  }
};

/**
 * route to retrieve foodtruck data from API and using middleware with REDIS to cache the response based on URL.
*/
router.get('/', cache(3600), async (req, res) => {
  try {
    const response = await axios.get(FOODTRUCKS_URL);
    const csvData = response.data;
    let jsonData = await csv().fromString(csvData);

    // Update jsonData with coordinates if necessary
    jsonData = await Promise.all(jsonData.map(async (truck) => {
      if (!truck.Latitude || !truck.Longitude) {
        const { lat, lng } = await getCoordinates(truck.LocationDescription);
        truck.Latitude = lat;
        truck.Longitude = lng;
      }
      return truck;
    }));

    res.json(jsonData);
  } catch (error) {
    res.status(500).send('Error fetching food trucks data');
  }
});

module.exports = router;
