import express from 'express';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(express.static('dist'));
  app.listen(3000, () => {
    console.log('🚀 Server started on http://localhost:3000');
  });
}
