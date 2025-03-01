import { IApiResponse } from './common';

export interface FileUploadResult {
  fileId: string;
  fileUrl: string;
}

export type FilesUploadResponse = IApiResponse<FileUploadResult[]>;
export type FileUploadResponse = IApiResponse<FileUploadResult>;
