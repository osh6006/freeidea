import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { type Editor } from '@tiptap/react';

interface IFontSizeListProps {
  editor: Editor;
}

const FontSizeList: React.FunctionComponent<IFontSizeListProps> = ({
  editor,
}) => {
  const fontSizeList = Array.from({ length: 30 }, (_, index) => index + 8);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>FontSize</DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit min-w-0 p-[10px] h-[300px] overflow-y-auto">
        {fontSizeList.map((el) => (
          <DropdownMenuItem
            key={el}
            className={cn('p-0')}
          >
            <button
              onClick={() =>
                editor.chain().focus().setFontSize(`${el}px`).run()
              }
              className={cn(
                'rounded-[4px] p-1.5',
                editor.isActive('textStyle', { fonsSize: `${el}px` })
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-800'
              )}
            >
              {el}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontSizeList;
