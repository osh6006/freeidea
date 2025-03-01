import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Editor } from '@tiptap/react';
import { ChevronDown, DotsHorizontal, Minus } from '@untitled-ui/icons-react';

interface IHorizontalListProps {
  editor: Editor;
  disabled?: boolean;
}

const hrTypes: {
  type: 'default' | 'dots' | 'dashed';
  icon: React.ComponentType | null;
  name: string;
}[] = [
  { type: 'default', icon: Minus, name: '기본형' },
  { type: 'dots', icon: DotsHorizontal, name: '도트' },
  { type: 'dashed', icon: null, name: '점선' },
];

const HorizontalList: React.FunctionComponent<IHorizontalListProps> = ({
  editor,
  disabled,
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger disabled={disabled}>
        <div className="text-[14px] flex gap-x-1 items-center font-bold">
          <Minus className="w-5 h-5" />
          <ChevronDown className="w-5 h-5 text-slate-300" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] min-w-0 py-[10px] px-[8px] space-y-[10px]">
        <DropdownMenuItem
          className="w-full h-full rounded-[4px] flex px-[12px] hover:bg-slate-50 py-[8px] gap-x-[10px] items-center"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus />
          기본형
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().insertCustomDivWithCircles().run()
          }
          className="w-full h-full rounded-[4px] flex px-[12px] hover:bg-slate-50 py-[8px] gap-x-[10px] items-center"
        >
          <DotsHorizontal />
          도트형
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full h-full rounded-[4px] flex px-[12px] hover:bg-slate-50 py-[8px] gap-x-[10px] items-center"
          onClick={() => editor.chain().focus().insertDashedBorder().run()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 10H3"
              stroke="#000"
            />
            <path
              d="M5 10H7"
              stroke="#000"
            />
            <path
              d="M9 10H11"
              stroke="#000"
            />
            <path
              d="M13 10H15"
              stroke="#000"
            />
            <path
              d="M17 10H19"
              stroke="#000"
            />
          </svg>
          점선형
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HorizontalList;
