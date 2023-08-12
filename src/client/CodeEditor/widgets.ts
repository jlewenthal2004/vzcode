import interact from '@replit/codemirror-interact';

// Interactive code widgets.
//  * Number dragger
//  * Boolean toggler
//  * URL clicker
//  * TODO color picker
// Inspired by:
// https://github.com/replit/codemirror-interact/blob/master/dev/index.ts
export const widgets = () =>
  interact({
    rules: [
      // a rule for a number dragger
      {
        // the regexp matching the value
        regexp: /-?\b\d+\.?\d*\b/g,
        // set cursor to "ew-resize" on hover
        cursor: 'ew-resize',
        // change number value based on mouse X movement on drag
        onDrag: (text, setText, e) => {
          const newVal = Number(text) + e.movementX;
          if (isNaN(newVal)) return;
          setText(newVal.toString());
        },
      },
      // bool toggler
      {
        regexp: /true|false/g,
        cursor: 'pointer',
        onClick: (text, setText) => {
          switch (text) {
            case 'true':
              return setText('false');
            case 'false':
              return setText('true');
          }
        },
      },
      // url clicker
      {
        regexp: /https?:\/\/[^ "]+/g,
        cursor: 'pointer',
        onClick: (text) => {
          window.open(text);
        },
      },
    ],
  });
