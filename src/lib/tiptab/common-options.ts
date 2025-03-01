import CenterBlockQuote from '@/lib/tiptab/center-block-quote';
import { CustomDashedHorizontalRule } from '@/lib/tiptab/dashed-horizontal-rule';
import { CustomDotsHorizontalRule } from '@/lib/tiptab/dots-horizontal-rule';
import { useUploadFile } from '@/service/file/use-service';
import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorProps } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';

const extensions = [
  StarterKit,
  ImageResize,
  Underline,
  Color,
  Youtube,
  TextStyle,
  CenterBlockQuote,
  CustomDotsHorizontalRule,
  CustomDashedHorizontalRule,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Placeholder.configure({
    placeholder: '내용을 입력해주세요.',
  }),
];

const editorProps: EditorProps = {
  attributes: {
    class: 'min-h-[412px] w-full text-[14px] text-slate-800 focus:outline-none',
  },
};

export { extensions, editorProps };
