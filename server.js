const express = require('express');
const app = express();

require('dotenv').config();
require('./startup/logging')();
require('./startup/routes')(app);
require('./services/database.services')();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	return res.send('SERVER STARTED..');
});

app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT ${PORT}`));