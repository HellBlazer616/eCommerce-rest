const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    greetings: 'order',
  });
});

module.exports = router;
