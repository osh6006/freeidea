'use client';

import React, { useCallback } from 'react';

import { UntitledIcon } from '@/components/icon';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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

const MobileToolbar = ({
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
    <Carousel
      opts={{
        align: 'start',
        slidesToScroll: 1,
      }}
      className={cn('flex items-center px-5', className)}
    >
      <CarouselPrevious
        className="aspect-square bg-transparent border-none disabled:bg-transparent"
        iconClassName="size-6"
      />
      <CarouselContent className={cn('py-[13px] flex items-center')}>
        {/* Heading */}
        <CarouselItem className="flex items-center justify-around gap-x-5">
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
                editor.isActive('bold')
                  ? 'text-slate-800 bg-slate-100'
                  : 'text-slate-600'
              )}
            >
              <UntitledIcon.Bold01 className="size-6 untitled-icon-bold" />
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
                editor.isActive('italic')
                  ? 'text-slate-800 bg-slate-100'
                  : 'text-slate-600'
              )}
            >
              <Italic01 className="size-6" />
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
                editor.isActive('underline')
                  ? 'text-slate-800 bg-slate-100'
                  : 'text-slate-600'
              )}
            >
              <Underline01 className="size-6" />
            </button>
          )}
        </CarouselItem>

        {/* color */}
        <CarouselItem className="flex items-center justify-around gap-x-5">
          {!excludeButtons?.includes('Color') && (
            <ColorList
              editor={editor}
              disabled={disabled}
            />
          )}

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

          {!excludeButtons?.includes('BlockQuote') && (
            <BlockQuoteList editor={editor} />
          )}
        </CarouselItem>

        <CarouselItem className="flex items-center justify-around gap-x-5">
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
        </CarouselItem>
      </CarouselContent>
      <CarouselNext
        className="aspect-square bg-transparent border-none disabled:bg-transparent"
        iconClassName="size-6"
      />
    </Carousel>
  );
};

export default MobileToolbar;
