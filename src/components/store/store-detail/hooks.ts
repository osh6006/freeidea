import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { storeQueryKey } from '@/service/store/query-option';
import { useWorkScrapMutation } from '@/service/work/use-service';
import { StoreType } from '@/types/store';
import { WorkDetailType } from '@/types/work';

export function useWorkDetailScrapMutation() {
  const { setPageQueriesData, rollbackQueriesDataList, setQueriesData } =
    useOptimisticUpdate();
  const { mutate } = useWorkScrapMutation();

  const scrapMutate = (id: string, isScrapping: boolean) => {
    const prevDataList = [
      setPageQueriesData<StoreType>(
        {
          queryKey: storeQueryKey.list({ sort: 'RANDOM', limit: 4 }),
        },
        {
          target: (item) => item.productId === id,
          updater: (item) => ({
            ...item,
            isScrapping: isScrapping,
          }),
        }
      ),
      setQueriesData<WorkDetailType>(
        {
          queryKey: storeQueryKey.detail(id),
        },
        (oldData) => ({
          ...oldData,
          isScrapping: isScrapping,
          scraps: isScrapping ? oldData.scraps + 1 : oldData.scraps - 1,
        })
      ),
    ];

    mutate(
      { id, isScrapping: isScrapping },
      { onError: () => rollbackQueriesDataList(prevDataList) }
    );
  };

  return { scrapMutate };
}
