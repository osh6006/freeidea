'use client';

import { PropsWithChildren, createContext, useContext } from 'react';

import { Editor } from '@tiptap/react';

export const EditorContext = createContext<Editor | null>(null);

export const useEditorContext = () => {
  const editor = useContext(EditorContext);

  return editor;
};

export default function EditorProvider({
  children,
  editor,
}: PropsWithChildren<{ editor: Editor | null }>) {
  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
}
