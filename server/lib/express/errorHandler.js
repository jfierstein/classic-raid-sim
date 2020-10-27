'use strict';

const handleError = (err, res) => {
  if (err instanceof Error) {
    res.status(500);
    if(process.env.NODE_ENV === 'production') 
      res.json({ status: 500, message: 'An error occurred on the server' });
    else res.json({ status: 500, message: err.message || err.toString() });
  } 
  else if (typeof err === 'object') {
    res.status(err.status || 500);
    if(process.env.NODE_ENV === 'production') 
      res.json({ status: 500, message: 'An error occurred on the server' });
    else res.json(err);
  } 
  else {
    res.status(500);
    if(process.env.NODE_ENV === 'production') 
      res.json({ status: 500, message: 'An error occurred on the server' });
    else res.json({ status: 500, message: err });
  }
}

const promiseMiddleware = (req, res, next) => {
  res.promise = async (promise) => {
    try {
        const result = await promise;
        if (typeof result === 'object')
          res.json(result);
        else
          res.send(result);
    }
    catch(err) {
       handleError(err, res);
    }
  }
  next();
};

module.exports = promiseMiddleware