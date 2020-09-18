# postcss-dialog-polyfill

>PostCSS plugin which add selector needed by [dialog-polyfill](https://github.com/GoogleChrome/dialog-polyfill)

```css
/* Input */
.test1::backdrop {
  background-color: #fff;
}
```

```css
/* Output */
.test1::backdrop, .test1 + .backdrop {
  background-color: #fff;
}
```

## Installation

```
npm i postcss postcss-dialog-polyfill --save-dev
```

## Usage

Check out [PostCSS documentation](https://github.com/postcss/postcss#usage) on how to use PostCSS plugins.
