'use strict';

const app = require('./express/server');
const PORT = 4000;

app.listen(PORT, () => console.log('Local app listening on port', PORT));
