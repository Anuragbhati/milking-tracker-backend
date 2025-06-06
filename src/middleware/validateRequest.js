const ApiResponse = require('../utils/apiResponse');

const validateMilkingSession = (req, res, next) => {
    try {
        const { start_time, end_time, duration, milk_quantity } = req.body;

        // Check if all required fields are present
        const requiredFields = ['start_time', 'end_time', 'duration', 'milk_quantity'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return ApiResponse.validationError(
                `Missing required fields: ${missingFields.join(', ')}`
            );
        }

        // Validate data types
        if (!isValidDate(start_time) || !isValidDate(end_time)) {
            return ApiResponse.validationError('Invalid date format');
        }

        if (typeof duration !== 'number' || typeof milk_quantity !== 'number') {
            return ApiResponse.validationError('Duration and milk quantity must be numbers');
        }

        // Validate values
        if (duration <= 0) {
            return ApiResponse.validationError('Duration must be greater than 0');
        }

        if (milk_quantity <= 0) {
            return ApiResponse.validationError('Milk quantity must be greater than 0');
        }

        const startDate = new Date(start_time);
        const endDate = new Date(end_time);

        if (startDate >= endDate) {
            return ApiResponse.validationError('End time must be after start time');
        }

        next();
    } catch (error) {
        next(error);
    }
};

const validateObjectId = (req, res, next) => {
    try {
        const { id } = req.params;
        const objectIdPattern = /^[0-9a-fA-F]{24}$/;

        if (!objectIdPattern.test(id)) {
            return ApiResponse.validationError('Invalid ID format');
        }

        next();
    } catch (error) {
        next(error);
    }
};

// Helper function to validate date strings
const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

module.exports = {
    validateMilkingSession,
    validateObjectId
};