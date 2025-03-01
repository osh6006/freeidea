export const workMutationKey = {
  scrap: (id: string, isScrapped: boolean) => ['work', 'scrap', id, isScrapped],
};
