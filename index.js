'use strict';
const parser = require('postcss-selector-parser');

function transformBackdropRule (rule) {
  return parser(selectors => {
    selectors.walkPseudos(pseudo => {
      if (pseudo.value !== '::backdrop') {
        return;
      }

      const reg = new RegExp(
        `.*${pseudo.parent.first.toString().trim()} \\+ \\.backdrop.*`
      );

      if (reg.test(rule.selector)) {
        return;
      }

      rule.cloneAfter({
        selector: rule.selector.replace(
          '::backdrop',
          ' + .backdrop'
        )
      });
    });
  }).process(rule.selector);
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-dialog-polyfill',
    Rule: transformBackdropRule
  };
};

module.exports.postcss = true;