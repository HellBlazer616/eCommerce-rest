const express = require('express');

const router = express.Router();

router.get('/api/v1/test', (req, res) => {
  res.json({
    greetings: 'hello',
  });
});

module.exports = router;
