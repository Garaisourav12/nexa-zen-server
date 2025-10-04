import express from 'express';

const app = express();

app.use(express.static('dist'));
app.listen(3000, () => {
  console.log('🚀 Server started on http://localhost:3000');
  if (process.env.NODE_ENV === 'production') {
    process.stdout.write(
      '⚠️ Server started on http://localhost:3000 [Development Build]\n',
    );
  }
});
