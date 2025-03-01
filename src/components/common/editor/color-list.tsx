import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { type Editor } from '@tiptap/react';
import { ChevronDown } from '@untitled-ui/icons-react';

interface IColorListProps {
  editor: Editor;
  disabled?: boolean;
}

const colorPallete = [
  {
    name: '검정',
    value: '#24282F',
  },
  {
    name: '빨강',
    value: '#FF6464',
  },
  {
    name: '노랑',
    value: '#FFCC1B',
  },
  {
    name: '초록',
    value: '#00B505',
  },
  {
    name: '파랑',
    value: '#00B9FF',
  },
  {
    name: '보라',
    value: '#E26EFF',
  },
  {
    name: '회색',
    value: '#9FA3AB',
  },
];

const ColorList: React.FunctionComponent<IColorListProps> = ({
  editor,
  disabled = false,
}) => {
  const currentColor = editor.getAttributes('textStyle').color || '#000000';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger disabled={disabled}>
        <div className="text-[14px] flex gap-x-1 items-center font-bold">
          <div
            style={{
              backgroundColor: currentColor,
            }}
            className={cn('w-5 h-5 rounded-full')}
          />
          <ChevronDown className="w-5 h-5 text-slate-300" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[150px] mt-2 min-w-0 px-[8px] py-[10px] space-y-[10px]"
      >
        {colorPallete.map(({ name, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor.chain().focus().setColor(value).run()}
            className="w-full flex items-center py-[8px] px-[12px] text-slate-800 gap-x-[10px] hover:bg-slate-50 rounded-[4px]"
          >
            <span
              style={{
                backgroundColor: value,
              }}
              className={cn('w-5 h-5 rounded-full')}
            />
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColorList;
