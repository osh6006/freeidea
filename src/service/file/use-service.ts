import { useMutation } from '@tanstack/react-query';

import { uploadFile, uploadFiles } from './service';

export function useUploadFile() {
  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
  });
}

export function useUploadFiles() {
  return useMutation({
    mutationFn: (files: FileList | File[]) => uploadFiles(files),
  });
}
