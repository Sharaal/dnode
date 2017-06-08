module.exports.parse = message => {
  let controller, body;
  try {
    [controller, body] = JSON.parse(message);
  } catch (e) {
    controller = message;
  }
  if (!body || typeof body !== 'object') {
    body = {};
  }
  return [controller, body];
};

module.exports.stringify = (controller, body) => {
  if (body) {
    return JSON.stringify([controller, body]);
  }
  return controller;
};
