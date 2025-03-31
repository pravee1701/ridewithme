import { validationResult } from "express-validator";
import { getAddressCoordinates, getAutoCompleteSuggestionservice, getDistanceAndTime } from "../services/map.services";


export const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await getAddressCoordinates(address);
        if (!coordinates) {
            return res.status(400).json({ message: "Coordinates not found" });
        }
        return res.status(200).json({ coordinates });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Cordinates not found" });
    }
};

export const getDistanceTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await getDistanceAndTime(origin, destination);
        if (!distanceTime) {
            return res.status(400).json({ message: "Distance and time not found" });
        }
        return res.status(200).json({ distanceTime });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Distance and time not found" });
    }
};

export const getAutoCompleteSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestionservice(input);
        if (!suggestions) {
            return res.status(400).json({ message: "Suggestions not found" });
        }
        return res.status(200).json({ suggestions });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: " suggestions not found" });
        
    }
};