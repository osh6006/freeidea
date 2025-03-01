import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';

// TipTap의 Commands 인터페이스 확장
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customDashedHorizontalRule: {
      /**
       * 다양한 스타일을 가진 Horizontal Rule을 삽입합니다.
       */
      insertDashedBorder: () => ReturnType;
    };
  }
}

export const CustomDashedHorizontalRule = Node.create({
  name: 'customDashedHorizontalRule',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'custom-dashed-hr',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'hr',
      mergeAttributes(HTMLAttributes, { class: 'custom-dashed-hr' }),
    ];
  },

  addCommands() {
    return {
      insertDashedBorder:
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
