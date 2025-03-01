import * as React from 'react';

import { Table } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Editor } from '@tiptap/react';

interface ITableListProps {
  editor: Editor;
}

const TableList: React.FunctionComponent<ITableListProps> = ({ editor }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Table />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit min-w-0 p-1 grid grid-cols-3">
          <DropdownMenuItem>
            <button
              type="button"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              className="w-full"
            >
              테이블 추가
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              className="w-full"
            >
              이전 열 추가
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="w-full"
            >
              다음 열 추가
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              열 삭제
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              이전 행 추가
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              다음 행 추가
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              행 삭제
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              테이블 삭제
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().mergeCells().run()}
            >
              셀 병합
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().splitCell().run()}
            >
              셀 분할
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
            >
              머리글 열 전환
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
            >
              머리글 행 전환
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            >
              머리글 셀 전환
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              className="w-full"
              onClick={() => editor.chain().focus().mergeOrSplit().run()}
            >
              병합 또는 분할
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableList;
