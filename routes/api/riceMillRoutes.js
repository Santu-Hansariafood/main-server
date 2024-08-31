const express = require('express');
const {
  registerRiceMill,
  getRiceMills,
  getRiceMillById,
  updateRiceMill,
  deleteRiceMill,
} = require('../../controllers/RiceMillController');

const router = express.Router();

router.post('/register', registerRiceMill);
router.get('/', getRiceMills);
router.get('/:id', getRiceMillById);
router.put('/:id', updateRiceMill);
router.delete('/:id', deleteRiceMill);

module.exports = router;
