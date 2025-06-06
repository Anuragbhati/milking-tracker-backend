const express = require('express');
const router = express.Router();
const MilkingSession = require('../models/MilkingSession');
const ApiResponse = require('../utils/apiResponse');
const { validateMilkingSession, validateObjectId } = require('../middleware/validateRequest');

// Create a new milking session
router.post('/', validateMilkingSession, async (req, res, next) => {
    try {
        const session = new MilkingSession(req.body);
        await session.save();

        res.status(201).json(
            ApiResponse.success(session, 'Milking session created successfully')
        );
    } catch (error) {
        next(error);
    }
});

// Get all milking sessions
router.get('/', async (req, res, next) => {
    try {
        const sessions = await MilkingSession.find().sort({ created_at: -1 });
        
        if (!sessions.length) {
            return res.json(
                ApiResponse.success([], 'No milking sessions found')
            );
        }

        res.json(
            ApiResponse.success(sessions, 'Milking sessions retrieved successfully')
        );
    } catch (error) {
        next(error);
    }
});

// Get a single milking session by ID
router.get('/:id', validateObjectId, async (req, res, next) => {
    try {
        const session = await MilkingSession.findById(req.params.id);
        
        if (!session) {
            return ApiResponse.error('Milking session not found', 404);
        }

        res.json(
            ApiResponse.success(session, 'Milking session retrieved successfully')
        );
    } catch (error) {
        next(error);
    }
});

// Delete a milking session
router.delete('/:id', validateObjectId, async (req, res, next) => {
    try {
        const session = await MilkingSession.findByIdAndDelete(req.params.id);

        if (!session) {
            return ApiResponse.error('Milking session not found', 404);
        }

        res.json(
            ApiResponse.success(null, 'Milking session deleted successfully')
        );
    } catch (error) {
        next(error);
    }
});

module.exports = router;