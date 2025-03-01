import { DefaultValues } from 'react-hook-form';

import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderLeft,
  AdminHeaderRight,
  AdminHeaderTitle,
} from '@/components/admin/common/header';
import EventEditorProvider from '@/components/admin/event/editor-provider';
import EventForm from '@/components/admin/event/form';
import EventFormProvider from '@/components/admin/event/form-provider';
import EventFormWrapper from '@/components/admin/event/form-wrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FORM_ID } from '@/constants/form-id';
import { getAdminEventDetail } from '@/service/admin/event/service';
import { EventWriteSchemaType } from '@/types/admin/event';

export const dynamic = 'force-dynamic';

async function AdminEventCreatePage({
  searchParams: { id },
}: {
  searchParams: {
    id?: string;
  };
}) {
  const mode = id ? 'update' : 'create';
  let defaultValues: DefaultValues<EventWriteSchemaType> | undefined =
    undefined;

  if (id) {
    const data = await getAdminEventDetail(id);

    defaultValues = {
      title: data.title,
      contents: data.contents,
      description: data.description,
      publishedAt: new Date(data.publishedAt),
      thumbnailImageId: data.thumbnailImage.fileId,
      thumbnailImageUrl: data.thumbnailImage.fileUrl,
    };
  }

  return (
    <main>
      {/* header */}
      <AdminHeader>
        <AdminHeaderLeft>
          <AdminHeaderTitle>이벤트 등록</AdminHeaderTitle>
          <AdminHeaderDescription>
            새로운 이벤트를 등록하거나 수정해 보세요
          </AdminHeaderDescription>
        </AdminHeaderLeft>
        <AdminHeaderRight>
          <Button
            form={FORM_ID.eventWrite}
            type="submit"
          >
            {id ? '수정하기' : '등록하기'}
          </Button>
        </AdminHeaderRight>
      </AdminHeader>

      {/* form */}
      <EventFormProvider defaultValues={defaultValues}>
        <EventEditorProvider>
          <EventFormWrapper mode={mode}>
            <>
              <Separator className="my-10" />
              <EventForm />
            </>
          </EventFormWrapper>
        </EventEditorProvider>
      </EventFormProvider>
    </main>
  );
}

export default AdminEventCreatePage;
