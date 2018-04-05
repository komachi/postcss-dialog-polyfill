import test from 'ava';
import {runTest} from './runTest.helper.js';

test('Should add needed selector', t => {

  return runTest().then(result => {
    t.is(result.css,
`.test1::backdrop {
  background-color: #fff;
}
.test1 + .backdrop {
  background-color: #fff;
}
.test1[open="true"]::backdrop {
  background-color: #999;
}
.test1[open="true"] + .backdrop {
  background-color: #999;
}
.test2::backdrop, .test2 + .backdrop {
  background-color: #000;
}
`
    );
  });
});
