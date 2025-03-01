import API_CODE from '@/constants/error-code';

class APIError extends Error {
  public code: string;

  constructor({ message, code }: { message?: string; code?: string }) {
    if (!code) {
      super(message ?? '알 수 없는 에러 발생');
      this.code = API_CODE.unexpected;
      return;
    }

    super(message);
    this.code = code;
  }
}

export default APIError;
