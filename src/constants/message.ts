export const ERROR_MESSAGE = {
  api: ({ code, message }: { code: string; message: string }) =>
    `[${code}] ${message}`,

  unexpected: (message?: string) =>
    `[Unexpected Error]: ${message ?? 'no description.'}`,
};
