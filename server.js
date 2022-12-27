const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routes/index');

const app = express();

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// app.use(router);

router(app);
