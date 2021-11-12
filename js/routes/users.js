"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('express');
const router = app.Router();
router.get('/', (req, res) => {
    res.send('get user');
});
router.post('/', (req, res) => {
    res.send('post user');
});
module.exports = router;
