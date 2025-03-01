'use client';

import { useEffect, useState } from 'react';

import { UntitledIcon } from '@/components/icon';
import { CardThumbnail, CardThumbnailImage } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { inputVariant } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  authorApplyStatusDict,
  snsLinkDict,
  userLevelDict,
  userStatusDict,
} from '@/constants/dictionary';
import { cn } from '@/lib/utils';
import { useAuthorApprovalDetailQuery } from '@/service/admin/author-approval/use-service';
import { format } from 'date-fns';

import AuthorApprovalMenuContents from './menu-content';

const AuthorApprovalDialog = ({
  id,
  email,
  nickName,
  userName,
}: {
  id: string;
  email: string;
  userName: string;
  nickName: string;
}) => {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState<boolean[]>([]);

  const { data, isLoading } = useAuthorApprovalDetailQuery(id, outerOpen);

  useEffect(() => {
    if (data?.productImages) {
      setInnerOpen(Array(data.productImages.length).fill(false));
    }
  }, [data]);

  const {
    productImages = [],
    requestStatus = '',
    snsLinkUrl = '',
    snsType = '',
    userLevel = '',
    createdAt = new Date(),
    examinedAt = new Date(),
    userStatus = '',
  } = data || {};

  const DialogStyles = {
    wrapper: 'space-y-[10px]',
    input: cn(inputVariant, 'bg-slate-tint-5'),
    active: cn(inputVariant, 'bg-pink-tint-5'),
  };

  return (
    <Dialog
      open={outerOpen}
      onOpenChange={setOuterOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UntitledIcon.DotsHorizontal />
        </DropdownMenuTrigger>
        <AuthorApprovalMenuContents
          id={id}
          email={email}
          nickName={nickName}
          userName={userName}
        />
      </DropdownMenu>
      <DialogContent className="max-w-[1200px] px-2 py-3">
        <ScrollArea className="h-[calc(100dvh-100px)] px-5 py-4">
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[10px]">
            <div className={DialogStyles.wrapper}>
              <Label>회원 ID</Label>
              <div className={DialogStyles.input}>{email}</div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>신청일</Label>
              <div className={DialogStyles.input}>
                {format(createdAt, 'yyyy.MM.dd')}
              </div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>회원명</Label>
              <div className={DialogStyles.input}>{userName}</div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>심사일</Label>
              <div className={DialogStyles.input}>
                {examinedAt ? format(examinedAt, 'yyyy.MM.dd') : '심사 전'}
              </div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>닉네임</Label>
              <div className={DialogStyles.input}>{nickName}</div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>상태</Label>
              <div className={DialogStyles.input}>
                {authorApplyStatusDict
                  .getTranslator('en-ko')
                  .translate(requestStatus)}
              </div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>SNS 링크</Label>
              <div className={DialogStyles.input}>
                {snsLinkDict.getTranslator('en-ko').translate(snsType)}
              </div>
              <div className={DialogStyles.input}>{snsLinkUrl || '없음'}</div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>회원 상태</Label>
              <div className={DialogStyles.active}>
                {userStatusDict.getTranslator('en-ko').translate(userStatus)}
              </div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>작품 첨부</Label>
              <div className={cn(DialogStyles.input, 'w-full h-fit p-5')}>
                <ul className="flex justify-between flex-wrap gap-4">
                  {productImages.map((image, index) => (
                    <li key={image.fileId}>
                      <Dialog
                        open={innerOpen[index]}
                        onOpenChange={(isOpen) => {
                          const newOpenState = [...innerOpen];
                          newOpenState[index] = isOpen;
                          setInnerOpen(newOpenState);
                        }}
                      >
                        <DialogTrigger asChild>
                          <button>
                            <CardThumbnail className="relative size-[250px]">
                              <CardThumbnailImage
                                src={image.fileUrl}
                                alt="image"
                              />
                            </CardThumbnail>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[1000px]">
                          <CardThumbnail className="relative mx-auto max-w-[500px]">
                            <CardThumbnailImage
                              src={image.fileUrl}
                              alt="image"
                              className="hover:scale-100"
                            />
                          </CardThumbnail>
                        </DialogContent>
                      </Dialog>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={DialogStyles.wrapper}>
              <Label>회원 구분</Label>
              <div className={DialogStyles.input}>
                {userLevelDict.getTranslator('en-ko').translate(userLevel)}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorApprovalDialog;
