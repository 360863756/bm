const componentGenerator = require('./plop-templates/component/generator.js');
const viewGenerator = require('./plop-templates/view/generator.js');

module.exports = function(plop) {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('view', viewGenerator);
};
