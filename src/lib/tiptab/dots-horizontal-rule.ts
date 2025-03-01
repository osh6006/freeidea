import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';

// TipTap의 Commands 인터페이스 확장
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customDivWithCircles: {
      /**
       * 다양한 스타일을 가진 Horizontal Rule을 삽입합니다.
       */
      insertCustomDivWithCircles: () => ReturnType;
    };
  }
}

export const CustomDotsHorizontalRule = Node.create({
  name: 'customDivWithCircles',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'div.custom-div-with-circles',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: 'custom-div-with-circles' }),
      ['div', { class: 'circle' }],
      ['div', { class: 'circle' }],
      ['div', { class: 'circle' }],
    ];
  },

  addCommands() {
    return {
      insertCustomDivWithCircles:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              content: [],
            })
            .run();
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type,
      }),
    ];
  },
});
