import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import CenterBlock from './center-block';

// TipTap의 Commands 인터페이스 확장
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    centerBlockQuote: {
      insertCenterBlockQuote: () => ReturnType;
    };
  }
}

const CenterBlockQuote = Node.create({
  name: 'centerBlockQuote',
  group: 'block',
  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'react-component',
      },
    ];
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => {
        return this.editor
          .chain()
          .insertContentAt(this.editor.state.selection.head, {
            type: this.type.name,
          })
          .focus()
          .run();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CenterBlock);
  },

  addCommands() {
    return {
      insertCenterBlockQuote:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
            })
            .run();
        },
    };
  },
});

export default CenterBlockQuote;
