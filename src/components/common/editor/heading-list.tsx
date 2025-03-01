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

interface IHeadingListProps {
  editor: Editor;
  disabled?: boolean;
}

const headingLevels: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  fontSize: number;
}[] = [
  { level: 1, title: '제목 1', fontSize: 26 },
  { level: 2, title: '제목 2', fontSize: 22 },
  { level: 3, title: '제목 3', fontSize: 18 },
];

const HeadingList: React.FunctionComponent<IHeadingListProps> = ({
  editor,
  disabled = false,
}) => {
  const ActiveLevel =
    headingLevels.find(({ level }) => editor.isActive('heading', { level }))
      ?.level || 0;
  const ActiveTitle = ActiveLevel
    ? headingLevels.find(({ level }) => level === ActiveLevel)?.title
    : '본문 1';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger disabled={disabled}>
        {ActiveTitle && (
          <div className="flex gap-x-1 items-center typo-body-14-bold-100-tight text-slate-600 ">
            <span className="w-[55px]">{ActiveTitle}</span>
            <ChevronDown className="w-5 h-5 text-slate-300" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit min-w-0 p-[10px] space-y-[10px]">
        {headingLevels.map(({ level, title, fontSize }) => (
          <DropdownMenuItem
            key={level}
            style={{ fontSize }}
            className={cn(
              'rounded-[4px] flex min-w-[150px] px-[12px] py-2 cursor-pointer font-bold',
              editor.isActive('heading', { level })
                ? 'bg-slate-800 text-white hover:bg-slate-800'
                : 'text-slate-800'
            )}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: level }).run()
            }
          >
            {title}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem
          key="paragraph"
          className={cn(
            'rounded-[4px] flex min-w-[150px] px-[12px] py-2 cursor-pointer font-bold',
            editor.isActive('paragraph')
              ? 'bg-slate-800 text-white hover:bg-slate-800'
              : 'text-slate-800'
          )}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          본문
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeadingList;
