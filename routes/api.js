const express = require('express');
const router = express.Router();

const ContentController = require('../Controller/ContentController');

// index messages
router.get('/', ContentController.Index);

// index posts
router.post("/list", ContentController.List);

// create posts
router.post('/create', ContentController.Create);

router.post('/delete/:id', ContentController.Delete);

module.exports = router;