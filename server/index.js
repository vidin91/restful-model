import Express from 'express';

const App = Express();

App.use('/test', (req, res) => {
  res.send('Hello World!');
});

export default function start() {
  App.listen(8080, () => {
    console.log('Server successfully started at port 8080.')
  });
}
