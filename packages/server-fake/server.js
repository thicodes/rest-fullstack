const fs = require('fs');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const userdb = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'UTF-8'));

const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`,
    );
  });
} else {
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(middlewares);

  // simulate low connection to view loading on frontend
  /*
  server.use((req, res, next) => {
    setTimeout(() => {
      next();
    }, 2000);
  });
  */

  const jwtSecret = '123456789';

  //  function getUser(token) {
  //    if (!token) return { user: null };

  //    try {
  //      const decodedToken = jwt.verify(token.substring(4), jwtSecret);

  //      const user = await User.findOne({ _id: decodedToken.id });

  //      return {
  //        user
  //      };
  //    } catch (err) {
  //      return { user: null };
  //    }
  //  }

  function generateToken(user) {
    return `JWT ${jwt.sign({ id: user.id }, jwtSecret)}`;
  }

  server.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = userdb.users.find(user => user.email === email && user.password === password);
    if (!user) {
      const status = 401;
      const message = 'Incorrect email or password';
      res.status(status).json({ status, message });
      return;
    }
    res.status(200).json({ token: generateToken(user) });
  });

  server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (!req.headers.authorization) {
      const status = 401;
      const message = 'Error in authorization format';

      res.status(status).json({ status, message });
      return;
    }
    try {
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token.substring(4), jwtSecret);
      const user = userdb.users.find(user => user.id === decodedToken.id);
      req.user = user;
      next();
    } catch (err) {
      const status = 401;
      const message = 'Error access_token is revoked';
      res.status(status).json({ status, message });
    }
  });

  server.get('/api/me', (req, res) => {
    res.send(req.user);
  });

  server.use('/api', router);

  server.listen(port, () => {
    console.log(`Node cluster worker ${process.pid}: listening on port ${port}`);
  });
}
