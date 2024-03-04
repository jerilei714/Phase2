const express = require('express');
const { createLab, getLab, updateLab, deleteLab } = require('../models/laboratory');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { lab_name, total_seats } = req.body;
        const laboratory = {
            lab_name,
            total_seats
        };
        const laboratoryId = await createLab(laboratory);
        res.status(201).json({ laboratoryId });
    } catch (error) {
        console.error('Error creating laboratory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:labId', async (req, res) => {
    try {
        const { labId } = req.params;
        const lab = await getLab(labId);
        if (lab) {
            res.json(lab);
        } else {
            res.status(404).json({ error: 'Lab not found' });
        }
    } catch (error) {
        console.error('Error getting lab:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:labId', async (req, res) => {
    try {
        const { labId } = req.params;
        const updatedLabData = req.body;
        const success = await updateLab(labId, updatedLabData);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Lab not found' });
        }
    } catch (error) {
        console.error('Error updating lab:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:labId', async (req, res) => {
    try {
        const { labId } = req.params;
        const success = await deleteLab(labId);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Lab not found' });
        }
    } catch (error) {
        console.error('Error deleting lab:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:labName', async (req, res) => {
    try {
        const { labName } = req.params;
        console.log('Lab name received:', labName); 
        const lab = await getLabByName(labName);
        if (lab) {
            console.log('Lab found:', lab); 
            res.json(lab);
        } else {
            console.log('Lab not found'); 
            res.status(404).json({ error: 'Lab not found' });
        }
    } catch (error) {
        console.error('Error getting lab by name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
