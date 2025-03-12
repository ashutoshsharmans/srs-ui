module.exports = (req, res, next) => {
  switch (req.path) {
    case '/user':
    case '/notification':
      next();
      break;
    case '/validate-equipment':
      validateEquipmentInterceptor(req, res, next);
      break;
    case '/stccs':
      getStccInterceptor(req, res, next);
      break;
    case '/pattern':
    case '/qualifiers':
    case '/submit':
    case '/special-endorsements':
      setTimeout(next, getRandomTimeout(3, 6));
      break;
    case '/error':
      respondError(req, res);
      break;
    default:
      setTimeout(next, getRandomTimeout(1, 3));
  }

  function getStccInterceptor(req, res, next) {
    const db = require('./db.json');
    const stccs = db.stccs;
    const input = req.query['query'];
    const filteredStccs = stccs.filter(stccDetail => stccDetail.stcc.toLowerCase().includes(input) || stccDetail.description.toLowerCase().includes(input));
    setTimeout(() => {
      res.json(input ? filteredStccs : []);
    }, 20);
  }

  function validateEquipmentInterceptor(req, res, next) {
    if (req.query['initial'] && req.query['number']) {
      const initial = req.query['initial'];
      const number = req.query['number'];
      setTimeout(
        () => {
          res.jsonp({
            initial,
            number,
            equipmentId: `${initial} ${number}`,
            notInUmber: false,
            valid: isValidEquipment(initial, number)
          });
        },
        getRandomTimeout(1, 3)
      );
    } else {
      res.status(404).jsonp({ error: 'Validation Failed' });
    }
  }

  function respondError(req, res) {
    res.status(500).jsonp({ error: 'Internal Server Error', message: 'Error Occurred' });
  }

  function getRandomTimeout(minSecond, maxSecond) {
    minSecond = Math.ceil(minSecond);
    maxSecond = Math.floor(maxSecond);
    return (Math.floor(Math.random() * (maxSecond - minSecond + 1)) + minSecond) * 1000;
  }

  function isValidEquipment(id, number) {
    return [
      { id: 'NS', number: '1' },
      { id: 'NS', number: '2' }
    ].some(eqp => eqp.id.toLowerCase() === id.toLowerCase() && eqp.number === number.toLowerCase());
  }
};
