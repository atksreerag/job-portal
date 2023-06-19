const express = require('express');
const app = express();

require('dotenv').config();
require('./startup/logging')();
require('./services/database.services')();
require('./startup/routes')(app);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	return res.send('SERVER STARTED..');
});

app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT ${PORT}`));