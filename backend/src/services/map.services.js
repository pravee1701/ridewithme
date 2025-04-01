import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import captainModel from "../models/captain.model.js";
const ORS_API_KEY = process.env.ORS_API_KEY;

// Function to get latitude and longitude from an address using OpenStreetMap (Nominatim)
export const getAddressCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url, {
            headers: { "User-Agent": "ridewithme" } 
        });

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error(`Failed to fetch coordinates for: ${address}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to get distance and travel time between two addresses
export const getDistanceAndTime = async (originName, destinationName) => {
    try {
        // Fetch coordinates for origin and destination
        const origin = await getAddressCoordinates(originName);
        const destination = await getAddressCoordinates(destinationName);

        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${origin.lng},${origin.lat}&end=${destination.lng},${destination.lat}`;

        // Make the API request
        const response = await axios.get(url);

        // Check if the response contains the required data
        if (response.data.features && response.data.features.length > 0) {
            const route = response.data.features[0].properties.segments[0]; 
            const summary = response.data.features[0].properties.summary; 
            return {
                origin: originName,
                destination: destinationName,
                distance_km: summary.distance / 1000, // Convert meters to kilometers
                duration_min: summary.duration / 60, // Convert seconds to minutes
                origin_coords: origin,
                destination_coords: destination,
            };
        } else {
            throw new Error("Failed to fetch distance and time: No route found");
        }
    } catch (error) {
        console.error("Error in getDistanceAndTime:", error);
        throw error;
    }
};

// Function to get autocomplete suggestions for addresses
export const getAutoCompleteSuggestionservice = async (query) => {
    try {

        if (!query) {
            throw new Error("Query parameter is required");
        }

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;

        const response = await axios.get(url, {
            headers: { "User-Agent": "ridewithme" } 
        });

        if (response.data.length > 0) {
            const suggestions = response.data.map((place) => ({
                display_name: place.display_name,
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lon),
            }));
            return suggestions;
        } else {
            throw new Error("No suggestions found");
        }
    } catch (error) {
        console.error("Autocomplete error:", error);
        throw error;
    }
};


export const getCaptainInTheRadius = async (ltd , lng , radius)=>{
    const captains  = await captainModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[lng , ltd] , radius / 6378.1]
            }
        }
    });

    return captains
}

