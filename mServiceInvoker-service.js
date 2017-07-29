/**
* @name MServiceInvoker
* @summary MServiceInvoker Hydra Express service entry point
* @description By nature &#39;mServiceIvoker&#39; is microservice, which can communicate to other microservices, especially in the scope this sample starter it invoke another microservice named ,&#39;mService&#39;.
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');

const jwtAuth = require('fwsp-jwt-auth');
const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    return jwtAuth.loadCerts(null, config.jwtPublicCert);
  })
  .then(status => {
    return hydraExpress.init(config.getObject(), version, () => {
      const app = hydraExpress.getExpressApp();
      app.set('views', './views');
      app.set('view engine', 'pug');
      hydraExpress.registerRoutes({
        '/v1/mServiceInvoker': require('./routes/mServiceInvoker-v1-routes')
      });
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
