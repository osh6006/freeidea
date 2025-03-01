import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { type Editor } from '@tiptap/react';
import { ChevronDown } from '@untitled-ui/icons-react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
} from '@untitled-ui/icons-react';

interface ITextAlignProps {
  editor: Editor;
  disabled?: boolean;
}

const textAlignTypes: {
  type: 'left' | 'center' | 'right';
  icon: React.ComponentType;
  name: string;
}[] = [
  { type: 'left', icon: AlignLeft, name: '왼쪽 정렬' },
  { type: 'center', icon: AlignCenter, name: '가운데 정렬' },
  { type: 'right', icon: AlignRight, name: '오른쪽 정렬' },
];

const TextAlign: React.FunctionComponent<ITextAlignProps> = ({
  editor,
  disabled = false,
}) => {
  const activeType =
    textAlignTypes.find(({ type }) => editor.isActive({ textAlign: type }))
      ?.type || 0;

  const ActiveIcon = activeType
    ? textAlignTypes.find(({ type }) => type === activeType)?.icon
    : AlignJustify;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger disabled={disabled}>
        <div className="text-[14px] flex gap-x-1 items-center font-bold">
          {ActiveIcon && <ActiveIcon className="w-6 h-6" />}
          <ChevronDown className="w-5 h-5 text-slate-300" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] min-w-0 py-[10px] px-[8px] space-y-[10px]">
        {textAlignTypes.map(({ name, icon: Icon, type }) => (
          <DropdownMenuItem
            key={type}
            onClick={() => editor.chain().focus().setTextAlign(type).run()}
            className={cn(
              'rounded-[4px] flex px-[12px] hover:bg-slate-50 py-[8px] w-full gap-x-[10px] items-center',
              editor.isActive({ textAlign: type })
                ? 'bg-slate-50'
                : 'text-slate-800'
            )}
          >
            <Icon />
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextAlign;
