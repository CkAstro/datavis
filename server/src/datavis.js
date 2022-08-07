// imports not working?
//
// `jsconfig.json` may have issues with the `baseUrl` and `path` compiler options.
// Since node will always check `node_modules` for an import, a simple work-around
//    is to add symlinks pointing back to the `src` directory. e.g.,
//       >: cd server/src/node_modules
//       >: ln -s .. @
//    and now you may use absolute imports:
//       import { gameService } from '@/services';

import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';

import { PORT } from '@/config';

// ----- init ----- //
const app = express();
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, './src/data');
   },
   filename: (req, file, callback) => {
      callback(null, `u_${file.originalname}`);
   },
});

const upload = multer({
   storage,
   fileFilter: (req, file, cb) => {
      if (
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/jpeg'
      )
         return cb(null, true);
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
   },
});

// ----- log ----- //
const requestLogger = (request, response, next) => {
   const message = {
      method: request.method,
      path: request.path,
      body: request.body,
   };
   console.log('received api call:', message);
   next();
};
app.use(requestLogger);

// ----- REST API ----- //
app.get('/api/img/:fileId', (req, res) => {
   const { fileId } = req.params;
   res.sendFile(`./src/data/img/${fileId}`, { root: '.' });
});

app.post('/api/img/:fileId', upload.single('image'), (req, res) => {
   if (!req.file) return res.status(400).json({ message: 'no file uploaded' });
   const { filename } = req.file;
   return res.sendFile(`./src/data/${filename}`, { root: '.' });
});

// ----- static serving ----- //
app.use(express.static('../client/build')); // NOTE: this MUST come after API requests

// ----- unknown endpoint ----- //
const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// ----- listen ----- //
app.listen(PORT, () => console.log(`DataVis server running on port ${PORT}`));
