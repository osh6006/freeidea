import { editorProps, extensions } from '@/lib/tiptab/common-options';
import { useUploadFile, useUploadFiles } from '@/service/file/use-service';
import { useEditor } from '@tiptap/react';

import { useToast } from './use-toast';

const IMAGE_UPLOAD_LIMIT_MB = 10;

export function useCommonEditor({
  content,
  onChange,
  initialContent,
  editable,
}: {
  content?: string;
  onChange?: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
}) {
  const { toast } = useToast();
  const { mutate } = useUploadFile();
  const { mutate: multiMutate } = useUploadFiles();

  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      ...editorProps,
      handleDrop(view, event, slice, moved) {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files.length > 0
        ) {
          const files = Array.from(event.dataTransfer.files);

          const validFiles = files.filter((file) => {
            const fileSizeMB = file.size / 1024 / 1024;
            if (fileSizeMB > IMAGE_UPLOAD_LIMIT_MB) {
              toast({
                description: `${file.name}의 크기가 10MB를 초과하여 업로드할 수 없습니다.`,
                variant: 'destructive',
              });
              return false;
            }

            if (!file.type.startsWith('image/')) {
              toast({
                description: `${file.name}은(는) 이미지 파일이 아닙니다.`,
                variant: 'destructive',
              });
              return false;
            }

            return true;
          });

          if (validFiles.length === 0) {
            return true;
          }

          const urls = validFiles.map((file) => URL.createObjectURL(file));

          const images = urls.map((url) => {
            const img = new Image();
            img.src = url;
            return new Promise((resolve) => {
              img.onload = () => resolve(img);
            });
          });

          Promise.all(images).then(() => {
            multiMutate(validFiles, {
              onSuccess: (data) => {
                const { schema } = view.state;
                const transaction = view.state.tr;

                data.forEach((fileData) => {
                  const node = schema.nodes.image.create({
                    src: fileData.fileUrl,
                  });
                  transaction.insert(transaction.doc.content.size, node);
                });

                view.dispatch(transaction);
              },
            });
          });

          return true;
        }
        return false;
      },

      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
          if (!item.type.startsWith('image/')) return;
          const file = item.getAsFile();
          if (!file) return;

          const fileSizeMB = file.size / 1024 / 1024;
          if (fileSizeMB > IMAGE_UPLOAD_LIMIT_MB) {
            toast({
              description: '이미지 크기는 10MB를 초과할 수 없습니다.',
              variant: 'destructive',
            });
            return;
          }

          mutate(file, {
            onSuccess: (data) => {
              const node = view.state.schema.nodes.image.create({
                src: data.fileUrl,
              });
              view.dispatch(view.state.tr.replaceSelectionWith(node));
            },
          });
        }
      },
    },

    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    onCreate: ({ editor }) => {
      editor.commands.setContent(initialContent ?? '');
    },
    immediatelyRender: false,
    editable: editable,
  });

  return editor;
}
