'use strict';
import postcss from 'postcss';
import parser from 'postcss-selector-parser';

module.exports = postcss.plugin('postcss-dialog-polyfill', () => css => {
  css.walkRules(rule => {
    parser(selectors => {
      selectors.walkPseudos(pseudo => {
        if (pseudo.value === '::backdrop') {
          if (
            !new RegExp(
              `.*${pseudo.parent.first.toString().trim()} \\+ \\.backdrop.*`
            ).test(rule.selector)
          ) {
            rule.selector +=
              `, ${pseudo.parent.first.toString().trim()} + .backdrop`;
          }
        }
      });
    }).process(rule.selector);
  });
});
