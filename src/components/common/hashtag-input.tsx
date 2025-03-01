import {
  type ForwardedRef,
  type KeyboardEventHandler,
  forwardRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';
import { Hash02, X } from '@untitled-ui/icons-react';

import { HashActionTag } from '../ui/action-tag';
import { Input, inputVariant } from '../ui/input';

interface HashtagInputProps {
  fixedTags?: string[];
  hashtags?: string[];
  onHashtagsChange?: (hashtags: string[]) => void;
  error?: boolean;
  disabled?: boolean;
  maxTags?: number;
}

/**
 * @param fixedTags 고정된 해시태그 (가장 앞에 렌더링됩니다.) on~~ 이벤트 핸들러 함수에 포함되지 않습니다.
 *
 */

const HashtagInput = forwardRef(
  (
    {
      fixedTags = [],
      hashtags = [],
      onHashtagsChange,
      error,
      disabled = false,
      maxTags = 10,
    }: HashtagInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [value, setValue] = useState('');
    const allTags = [...fixedTags, ...hashtags];

    const removeHashtag = (target: string) => {
      if (!hashtags) return [];
      const filteredHashtags = hashtags.filter((hashtag) => hashtag !== target);
      onHashtagsChange?.(filteredHashtags);
    };

    const handleHastagInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
      e.preventDefault();

      const newTag = e.currentTarget.value.trim();
      if (!newTag) return;

      hashtags?.push(newTag);
      const addedHashtags = Array.from(new Set(hashtags));
      setValue('');
      onHashtagsChange?.(addedHashtags);
    };

    return (
      <div
        className={cn(
          inputVariant,
          'flex items-baseline py-[12px] px-[10px] h-auto',
          'focus-within:ring-2 focus-within:ring-slate-800 gap-[6px] flex-wrap',
          error && 'bg-pink-50 border-error',
          disabled && 'bg-slate-tint-5 border-none'
        )}
      >
        {fixedTags?.map((hashtag) => (
          <HashActionTag
            key={hashtag}
            className="bg-pink-50 border-pink-200 border"
          >
            <span>{hashtag}</span>
          </HashActionTag>
        ))}
        {hashtags?.map((hashtag) => (
          <HashActionTag key={hashtag}>
            <span>{hashtag}</span>
            <button
              type="button"
              className="ml-[4px]"
              onClick={() => removeHashtag(hashtag)}
            >
              <X className="size-[16px]" />
            </button>
          </HashActionTag>
        ))}
        {allTags.length < maxTags && (
          <div className="flex items-center w-full flex-1">
            <Hash02
              className={cn(
                'size-[10px] text-icon',
                disabled && 'text-slate-300'
              )}
            />
            <Input
              ref={ref}
              className="disabled:bg-transparent border-none p-0 focus-visible:ring-0 h-full bg-transparent"
              placeholder="입력 (최대 10개)"
              onKeyDown={handleHastagInput}
              disabled={disabled}
              onChange={(e) => setValue(e.currentTarget.value)}
              value={value}
              enterKeyHint="enter"
            />
          </div>
        )}
      </div>
    );
  }
);
HashtagInput.displayName = 'HashtagInput';

export default HashtagInput;
