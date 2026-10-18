const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*' }));
app.use(express.json({ limit: '1mb' }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }));

// Every file in src/routes exporting { path, router } is mounted automatically.
const routesDir = path.join(__dirname, 'routes');
if (fs.existsSync(routesDir)) {
  fs.readdirSync(routesDir)
    .filter((file) => file.endsWith('.routes.js'))
    .forEach((file) => {
      const { path: mountPath, router } = require(path.join(routesDir, file));
      app.use(mountPath, router);
    });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
