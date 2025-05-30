const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ctrl = require('../controllers/parcelaController');

const upload = multer({ dest: path.join(__dirname, '../../uploads/temp') });

router.get('/pending', ctrl.findPending);
router.get('/',        ctrl.findByCliente);
router.post('/:id/pay', upload.single('comprovante'), ctrl.pay);

module.exports = router;
