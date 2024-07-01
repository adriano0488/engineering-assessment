const express = require('express');
const foodtrucks = require('./routes/foodtrucks');
const app = express();
const port = 3001;

app.use('/api/foodtrucks', foodtrucks);

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
