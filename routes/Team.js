const Team = require('../models/Team');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createTeam, addMembersToTeam } = require('../controllers/teamController');
router.post('/', authMiddleware, createTeam); 
router.put('/:teamID/members', authMiddleware, addMembersToTeam); 
module.exports = router;