const postcss = require('postcss');
const plugin = require('./');

const testCss = `
.test1::backdrop {
  background-color: #fff;
}
.test1[open="true"]::backdrop {
  background-color: #999;
}
.test2::backdrop, .test2 + .backdrop {
  background-color: #000;
}
`;

async function run (input, output) {
  let result = await postcss([plugin()])
    .process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it('convert css sucessufully', async () => {
  const resultCss = `
.test1::backdrop {
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
`;
  await run(testCss, resultCss)
});