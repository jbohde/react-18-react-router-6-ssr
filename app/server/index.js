const React = require('react');
const express = require('express');
const { renderToString } = require("react-dom/server");
const compression = require('compression');
console.log(">>>>> HERERE >>>>>")
const path = require('path');
const fs = require('fs');

const App = require('../shared/App').default;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());

app.get('*', (req, res, next) => {
  console.log(">>> I'm here on the server >>>")
  console.log(`Request URL = ${req.url}`);
  if (req.url !== '/') {
    return next();
  }
  const reactApp = renderToString(React.createElement(App));
  console.log(reactApp);

  const indexFile = path.resolve('dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      const errMsg = `There is an error: ${err}`;
      console.error(errMsg);
      return res.status(500).send(errMsg);
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})
