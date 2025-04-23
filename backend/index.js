require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db      = require('./db');

const facilities = require('./routes/facilities');
const pickups   = require('./routes/pickups');
const feedback  = require('./routes/feedback');
const reminders = require('./routes/reminders');
const wasteTypes = require('./routes/wasteTypes');
const stats = require('./routes/stats');
const products   = require('./routes/products');




const app = express();
app.use(cors());
app.use(express.json());

app.use('/facilities', facilities);
app.use('/pickups', pickups);
app.use('/feedback', feedback);
app.use('/reminders', reminders);   
app.use('/waste-types', wasteTypes);
app.use('/stats', stats);
app.use('/products',   products);





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
