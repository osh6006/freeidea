import { DefaultValues } from 'react-hook-form';

import BaseInfoSection from '@/components/store-new/base-info-section';
import CategorySection from '@/components/store-new/category-section';
import DetailInfoSection from '@/components/store-new/detail-info';
import EditorSection from '@/components/store-new/editor-section';
import ImageGuideSection from '@/components/store-new/image-guide-section';
import PriceSection from '@/components/store-new/price-section';
import StoreForm from '@/components/store-new/store-form';
import StoreFormProvider from '@/components/store-new/store-form-provider';
import TextDisabledController from '@/components/store-new/text-disabled-controller';
import { getStoreEditData } from '@/service/store/service';
import { WorkNewSchemaType } from '@/types/work';

async function Page({ searchParams }: { searchParams: { id?: string } }) {
  let defaultValues: DefaultValues<WorkNewSchemaType> | undefined;

  const id = searchParams.id;
  if (id) {
    const { modifyCount, workDays, thumbnailImages, ...data } =
      await getStoreEditData(id);

    const thumbnails = thumbnailImages.map(
      ({ fileId, fileUrl }) =>
        ({
          fileId,
          fileUrl,
          status: 'success',
          file: undefined,
        }) as const
    );

    defaultValues = {
      thumbnails,
      modifyCount: String(modifyCount),
      workDays: String(workDays),
      ...data,
    };
  }

  return (
    <div className="mt-[50px] mb-[200px]">
      <h1 className="typo-title-32-bold-150">판매 작품 등록</h1>
      <div className="typo-body-14-semi-bold-100-tight bg-slate-50 p-[20px] rounded-[6px] flex justify-between items-center">
        <div>
          원하는 의뢰를 받을 수 있도록{' '}
          <span className="text-primary">필요사항</span>을 입력하세요.
        </div>
      </div>

      <ImageGuideSection />

      <TextDisabledController>
        <StoreFormProvider defaultValues={defaultValues}>
          <StoreForm>
            <div className="flex flex-col gap-[80px] mt-[30px]">
              <BaseInfoSection />
              <CategorySection />
              <DetailInfoSection />
              <PriceSection />
              <EditorSection />
            </div>
          </StoreForm>
        </StoreFormProvider>
      </TextDisabledController>
    </div>
  );
}

export default Page;
