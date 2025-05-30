const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/clienteController');

router.get('/',    ctrl.findAll);
router.get('/:id', ctrl.findById);
router.post('/',   ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
