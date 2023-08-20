const express = require('express');
const router = express.Router();
const { getTable4,addTable4 } = require('../controllers/page3/schema4Controller'); // Replace with the correct path
const requireAuth = require('../middleware/requireAuth')

// GET request to retrieve all schema1 data
router.get('/schema4', getTable4);

// POST request to create a new schema1 data
router.post('/schema4', addTable4);

module.exports = router