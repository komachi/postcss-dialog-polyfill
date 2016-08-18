import test from 'ava';
import {runTest} from './runTest.helper.js';

test('Should add needed selector', t => {

  return runTest().then(result => {
    t.is(result.css,
`.test1::backdrop, .test1 + .backdrop {
  background-color: #fff;
}
.test2::backdrop, .test2 + .backdrop {
  background-color: #000;
}
`
    );
  });
});
