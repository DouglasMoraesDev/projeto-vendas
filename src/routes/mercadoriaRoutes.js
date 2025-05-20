// src/routes/mercadoriaRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ctrl = require('../controllers/mercadoriaController');

const upload = multer({
  dest: path.join(__dirname, '../../uploads/temp'),
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.get('/',       ctrl.findAll);
router.get('/:id',    ctrl.findById);
router.post('/',      upload.array('fotos', 5), ctrl.create);
router.put('/:id',    upload.array('fotos', 5), ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
