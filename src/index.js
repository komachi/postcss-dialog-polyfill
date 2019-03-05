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
  });
});
