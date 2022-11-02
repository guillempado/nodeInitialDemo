const express = require('express');
const router = express.Router();

const error = `The URL isn't valid`;
const action = (req, res) => res.status(400).json({error});

router.get('*', action)
router.post('*', action)
router.delete('*', action)
router.put('*', action)

module.exports = router;