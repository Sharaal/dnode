const path = require('path');
const swig = require('swig');

module.exports = ({ app }) => {
  app.engine('twig', swig.renderFile);
  app.set('views', path.join(process.cwd(), 'views'));
  return swig;
};
