'use strict';
import postcss from 'postcss';
import parser from 'postcss-selector-parser';

module.exports = postcss.plugin('postcss-dialog-polyfill', () => css => {
  css.walkRules(rule => {
    parser(selectors => {
      selectors.walkPseudos(pseudo => {
        if (pseudo.value !== '::backdrop') {
          return;
        }

        const parentFirst = pseudo.parent.first.toString().trim();
        const reg = new RegExp(`.*${parentFirst} \\+ \\.backdrop.*`);

        if (reg.test(rule.selector)) {
          return;
        }

        rule.cloneAfter({
          selector: `${parentFirst} + .backdrop`
        });
      });
    }).process(rule.selector);
  });
});
