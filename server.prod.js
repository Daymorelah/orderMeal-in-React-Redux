import express from 'express';
import path from 'path';

/* eslint-disable no-console */

const PORT = process.env.PORT || 3000;
const app = express();

//set headers to increase security of app
app.set('x-powered-by', 'Dazmarlah');
app.set('X-Frame-Options', 'SAMEORIGIN')
app.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
app.set('X-Content-Type-Options', 'nosniff')
app.set('Content-Security-Policy', 'script-src self')
app.set('Referrer-Policy', 'no-referrer')
app.set('Permissions-Policy', 'geolocation=(self), microphone=()')

app.use(express.static(__dirname));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Sever is up and running on port ${PORT}`);
  }
});
