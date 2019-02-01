import express from 'express';
import path from 'path';

/* eslint-disable no-console */

const PORT = process.env.PORT || 3000;
const app = express();

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Sever is up and running on port ${PORT}`);
  }
});
