import * as React from 'react';

import { cn } from '@/lib/utils';

import { inputVariant } from './input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  autoResize?: boolean;
  submitOnEnter?: boolean;
  // submitKey?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => boolean;
}

const useAutoResizeTextarea = (
  ref: React.ForwardedRef<HTMLTextAreaElement>,
  autoResize: boolean
) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useImperativeHandle(ref, () => textAreaRef.current!);

  React.useEffect(() => {
    const ref = textAreaRef?.current;

    const updateTextareaHeight = () => {
      if (ref && autoResize) {
        ref.style.height = 'auto';
        const scrollHeight = `${ref.scrollHeight}px`;
        const computedStyleMap = ref.computedStyleMap();
        const borderTopWidth =
          computedStyleMap.get('border-top-width')?.toString() ?? '0';
        const borderBottomWidth =
          computedStyleMap.get('border-bottom-width')?.toString() ?? '0';

        ref.style.height = `calc(${scrollHeight} + ${borderTopWidth} + ${borderBottomWidth})`;
      }
    };

    updateTextareaHeight();
    ref?.addEventListener('input', updateTextareaHeight);

    return () => ref?.removeEventListener('input', updateTextareaHeight);
  }, []);

  return { textAreaRef };
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      autoResize = false,
      onKeyDown,
      submitOnEnter = false,
      ...props
    },
    ref
  ) => {
    const { textAreaRef } = useAutoResizeTextarea(ref, autoResize);

    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.nativeEvent.isComposing) return;

      if (!submitOnEnter && (e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
      } else if (
        submitOnEnter &&
        !(e.shiftKey || e.ctrlKey || e.metaKey) &&
        e.key === 'Enter'
      ) {
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
      }

      onKeyDown?.(e);
    };

    return (
      <textarea
        className={cn(
          inputVariant,
          error ? 'bg-pink-50 border-error' : '',
          autoResize && 'resize-none',
          className
        )}
        onKeyDown={handleKeyDown}
        ref={textAreaRef}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
