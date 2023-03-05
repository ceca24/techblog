const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

