'use client';

import React, { useCallback } from 'react';

import { cn } from '@/lib/utils';
import { useUploadFiles } from '@/service/file/use-service';
import { type Editor } from '@tiptap/react';
import { Image01, Italic01, Underline01 } from '@untitled-ui/icons-react';
import { Paperclip } from '@untitled-ui/icons-react';
import { List } from '@untitled-ui/icons-react';
import { Youtube } from '@untitled-ui/icons-react';

import BlockQuoteList from './block-quote-list';
import ColorList from './color-list';
import HeadingList from './heading-list';
import HorizontalList from './horizontal-list';
import TextAlign from './text-align';

interface IToolbarProps {
  editor: Editor | null;
  className?: string;
  disabled?: boolean;
  excludeButtons?: (
    | 'Heading'
    | 'Bold'
    | 'Italic'
    | 'Underline'
    | 'Color'
    | 'TextAlign'
    | 'Horizontal'
    | 'BlockQuote'
    | 'List'
    | 'Link'
    | 'Image'
    | 'Youtube'
  )[];
}

const Toolbar = ({
  editor,
  disabled = false,
  excludeButtons,
  className,
}: IToolbarProps) => {
  const { mutate: uploadMutate } = useUploadFiles();

  const setLink = useCallback(() => {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes('link').href;
    const url = window?.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  // Adding image to the editor
  const addImages = (images: { fileId: string; fileUrl: string }[]) => {
    const imagesContent = images.map(({ fileId, fileUrl }) => ({
      type: 'image',
      attrs: {
        src: fileUrl,
        alt: fileId,
      },
    }));
    editor.chain().focus().insertContent(imagesContent).run();
  };

  const handleImageUpload = (files: FileList | File[]) => {
    uploadMutate(files, {
      onSuccess: addImages,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return;

    const { files } = e.target;

    if (files) {
      handleImageUpload(files);
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  return (
    <div
      className={cn(
        'flex py-[22px] sticky justify-center items-center gap-x-5 gap-y-4 w-full pc-screen:gap-x-9',
        className
      )}
    >
      {/* Heading */}
      {!excludeButtons?.includes('Heading') && (
        <HeadingList
          editor={editor}
          disabled={disabled}
        />
      )}

      {/* Bold */}
      {!excludeButtons?.includes('Bold') && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
          className={cn(
            'flex items-center p-1.5 aspect-square justify-center rounded-[4px]',
            editor.isActive('bold') ? 'text-slate-800 ' : 'text-slate-600'
          )}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2499 11.8C15.7395 11.5018 16.1527 11.0934 16.4566 10.6073C16.7604 10.1212 16.9465 9.57077 16.9999 9C17.0092 8.48388 16.9167 7.971 16.7277 7.49063C16.5387 7.01027 16.257 6.57184 15.8985 6.20039C15.5401 5.82894 15.1119 5.53174 14.6386 5.32578C14.1653 5.11981 13.656 5.00911 13.1399 5H6.6499V19H13.6499C14.1411 18.9948 14.6264 18.8929 15.0781 18.7001C15.5299 18.5073 15.9392 18.2274 16.2828 17.8764C16.6264 17.5253 16.8975 17.1101 17.0806 16.6543C17.2637 16.1985 17.3552 15.7112 17.3499 15.22V15.1C17.3502 14.4071 17.1528 13.7285 16.7808 13.144C16.4088 12.5594 15.8777 12.0931 15.2499 11.8ZM8.6499 7H12.8499C13.2761 6.98681 13.6961 7.10428 14.0536 7.33665C14.4111 7.56902 14.6889 7.90517 14.8499 8.3C15.0128 8.82779 14.9601 9.39859 14.7034 9.88765C14.4467 10.3767 14.0068 10.7443 13.4799 10.91C13.2753 10.97 13.0631 11.0003 12.8499 11H8.6499V7ZM13.2499 17H8.6499V13H13.2499C13.6761 12.9868 14.0961 13.1043 14.4536 13.3367C14.8111 13.569 15.0889 13.9052 15.2499 14.3C15.4128 14.8278 15.3601 15.3986 15.1034 15.8877C14.8467 16.3767 14.4068 16.7443 13.8799 16.91C13.6753 16.97 13.4631 17.0003 13.2499 17Z"
              fill="#4B515B"
            />
          </svg>
        </button>
      )}

      {/* Italic */}
      {!excludeButtons?.includes('Italic') && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
          className={cn(
            'flex items-center p-1.5 aspect-square justify-center rounded-[4px]',
            editor.isActive('italic') ? 'text-slate-800 ' : 'text-slate-600'
          )}
        >
          <Italic01 className="w-5 h-5" />
        </button>
      )}

      {/* Under Line */}
      {!excludeButtons?.includes('Underline') && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          className={cn(
            'flex items-center p-1.5 aspect-square justify-center rounded-[4px]',
            editor.isActive('underline') ? 'text-slate-800 ' : 'text-slate-600'
          )}
        >
          <Underline01 className="w-5 h-5" />
        </button>
      )}

      {/* color */}
      {!excludeButtons?.includes('Color') && (
        <ColorList
          editor={editor}
          disabled={disabled}
        />
      )}
      {/* <input
          type="color"
          onInput={(event: any) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes('textStyle').color}
          data-testid="setColor"
        /> */}

      {/* Text align */}
      {!excludeButtons?.includes('TextAlign') && (
        <TextAlign
          editor={editor}
          disabled={disabled}
        />
      )}

      {/* Horizontal */}
      {!excludeButtons?.includes('Horizontal') && (
        <HorizontalList
          editor={editor}
          disabled={disabled}
        />
      )}

      {/* <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="w-5 h-5" />
        </button> */}

      {/* Strikethrough Button */}
      {/* <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
          }}
          className={cn(
            'flex items-center p-1.5 aspect-square justify-center rounded-[4px]',
            editor.isActive('strike')
              ? 'bg-slate-800 text-white '
              : 'text-slate-800'
          )}
        >
          <Strikethrough className="w-5 h-5" />
        </button> */}

      {/* Block Quote */}
      {/* <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={cn(
            'flex items-center p-1.5 aspect-square justify-center rounded-[4px]',
            editor.isActive('block')
              ? 'bg-slate-800 text-white '
              : 'text-slate-800'
          )}
        >
          <Quote className="w-5 h-5" />
        </button> */}
      {!excludeButtons?.includes('BlockQuote') && (
        <BlockQuoteList editor={editor} />
      )}

      {/* List */}
      {!excludeButtons?.includes('List') && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            'flex items-center p-1.5 aspect-square justify-center rounded-[4px]',
            editor.isActive('bulletList')
              ? 'bg-slate-800 text-white '
              : 'text-slate-800'
          )}
        >
          <List className="w-5 h-5" />
        </button>
      )}

      {/* Link */}
      {!excludeButtons?.includes('Link') && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setLink();
          }}
        >
          <Paperclip className="w-5 h-5" />
        </button>
      )}
      {/* <button
          type="button"
          onClick={() => {
            editor.chain().focus().unsetLink().run();
          }}
        >
          <Unlink className="w-5 h-5" />
        </button> */}

      {/* Image */}
      {!excludeButtons?.includes('Image') && (
        <label
          className="inline-block px-2 cursor-pointer"
          htmlFor="upload"
        >
          <Image01 className="untitled-icon w-6 h-6" />
          <input
            className="hidden"
            disabled={disabled}
            id="upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
        </label>
      )}

      {/* Youtube */}
      {!excludeButtons?.includes('Youtube') && (
        <button
          id="add"
          type="button"
          disabled={disabled}
          onClick={() => addYoutubeVideo()}
          className="flex items-center p-1.5 aspect-square justify-center rounded-[4px]"
        >
          <Youtube className="untitled-icon w-6 h-6" />
        </button>
      )}

      {/* <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            'flex items-center p-1.5 aspect-square justify-center rounded-[4px]',
            editor.isActive('orderedList')
              ? 'bg-slate-800 text-white '
              : 'text-slate-800'
          )}
        >
          <ListOrdered className="w-5 h-5" />
        </button> */}

      {/* Table */}
      {/* <TableList editor={editor} /> */}

      {/* Code */}
      {/*
        {!excludeButtons?.includes('Code') && (
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={cn(
              'flex items-center p-1.5 aspect-square justify-center rounded-[4px]',
              editor.isActive('codeBlock')
                ? 'bg-slate-800 text-white '
                : 'text-slate-800'
            )}
          >
            <Code className="w-5 h-5" />
          </button>
        )}
        */}
      {/* Font Size
        <FontSizeList editor={editor} /> */}
    </div>
  );
};

export default Toolbar;
