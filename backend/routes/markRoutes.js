const express = require('express');
const router = express.Router();
const markController = require('../controllers/markController');

router.post('/', markController.createMark);
router.get('/', markController.getAllMarks);
router.get('/:id', markController.getMarkById);
router.put('/:id', markController.updateMark);
router.delete('/:id', markController.deleteMark);

module.exports = router;
