import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { FileUploadResponse, FilesUploadResponse } from '@/types/file';

const FILE_SIZE_TOO_LARGE_ERROR = new APIError({
  message: '파일 크기가 너무 큽니다. 10MB 이하 파일을 업로드해 주세요.',
  code: 'FILE_SIZE_TOO_LARGE',
});

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.postForm('/file/single', {
    body: formData,
  });
  const { data, code, message }: FileUploadResponse = await res.json();

  if (res.status === 413) {
    throw new APIError({
      message: '파일 크기가 너무 큽니다. 10MB 이하 파일을 업로드해 주세요.',
      code: 'FILE_SIZE_TOO_LARGE',
    });
  }
  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!res.ok) throw new Error(ERROR_MESSAGE.api({ code, message }));

  return data;
};

export const uploadFiles = async (files: FileList | File[]) => {
  const fileArray = Array.from(files);
  const formData = new FormData();
  fileArray.forEach((file) => {
    formData.append('files', file);
  });

  const res = await api.postForm('/file/multiple', {
    body: formData,
  });

  const { data, code, message }: FilesUploadResponse = await res.json();

  if (res.status === 413) throw FILE_SIZE_TOO_LARGE_ERROR;
  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!res.ok) throw new Error(ERROR_MESSAGE.api({ code, message }));
  return data;
};
