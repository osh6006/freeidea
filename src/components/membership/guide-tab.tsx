'use client';

import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import Link from 'next/link';

import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { PATH } from '@/constants/path';
import { cn, formatCurrency } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useChangeMembershipMutation } from '@/service/membership/use-service';
import { useMyMembership } from '@/service/mypage/use-service';
import { MembershipType } from '@/types/membership';
import { Check } from '@untitled-ui/icons-react';
import { formatDate } from 'date-fns';

import ImageWithFallback from '../common/image-with-fallback';
import { membershipVariants } from '../common/membership';
import { Secure, SecureContent, SecureFallback } from '../common/secure';
import { Button, buttonVariants } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const MEMBERSHIP = 'membership';
const ADVERTISEMENT = 'advertisement';

type TabType = typeof MEMBERSHIP | typeof ADVERTISEMENT;

interface Props {
  activeTab: TabType;
  setActiveTab: Dispatch<SetStateAction<TabType>>;
}

function Tabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="flex gap-0 w-full">
      <Button
        onClick={() => setActiveTab(MEMBERSHIP)}
        variant={activeTab === MEMBERSHIP ? 'accent' : 'outline'}
        className="rounded-r-none w-[180px]"
      >
        멤버쉽
      </Button>
      <Button
        onClick={() => setActiveTab(ADVERTISEMENT)}
        variant={activeTab === ADVERTISEMENT ? 'accent' : 'outline'}
        className="rounded-l-none w-[180px]"
      >
        광고
      </Button>
    </div>
  );
}

type MembershipOption = {
  type: MembershipType;
  href?: string;
  disabled?: boolean;
  isSubscribed?: boolean;
  mode?: 'update' | 'create';
  onUpdateClick?: () => void;
};

function MembershipCard({
  type,
  href,
  disabled = false,
  isSubscribed = false,
  mode = 'create',
  onUpdateClick,
}: MembershipOption) {
  const { title, variants, price, benefits } = MEMBERSHIP_OPTION[type];

  const style = {
    update: cn(
      membershipVariants({
        variant: variants,
        mode: isSubscribed ? 'default' : 'hover',
        className: 'text-inherit hover:text-inherit',
      }),
      isSubscribed && 'border-4'
    ),

    create: cn(
      membershipVariants({
        variant: variants,
        mode: 'hover',
        className: 'text-slate-800',
      }),
      'border'
    ),
  };

  return (
    <div
      className={cn(
        'w-full border rounded-[10px] py-5 flex flex-col gap-5 items-center pc-screen:p-[40px] pc-screen:w-[285px] pc-screen:gap-[70px]',
        'text-slate-800',
        style[mode],
        disabled &&
          'cursor-not-allowed !text-slate-300 pointer-events-none border-slate-200 bg-slate-tint-5'
      )}
    >
      <div className="flex flex-col gap-4 items-center pc-screen:gap-[30px]">
        <div className="typo-title-18-medium-100">{title}</div>
        <div>
          <span className="typo-title-32-bold-150">
            {formatCurrency(price)}{' '}
          </span>
          원
        </div>
      </div>

      <ul className=" pc-screen:self-start">
        {benefits.map((benefit) => (
          <li
            key={benefit}
            className="flex items-center gap-[6px] "
          >
            <Check className="size-[18px]" />
            {benefit}
          </li>
        ))}
      </ul>
      {href && (
        <Secure requiredLevel={'AUTHOR'}>
          <SecureContent>
            {mode === 'create' ? (
              <Button
                className="w-[280px] h-10 pc-screen:h-[46px] pc-screen:w-full "
                variant={'outline'}
                asChild={!disabled}
                disabled={disabled}
              >
                <Link href={href}>결제하기</Link>
              </Button>
            ) : (
              <Button
                className="w-[280px] h-10 pc-screen:h-[46px] pc-screen:w-full"
                variant={'outline'}
                onClick={onUpdateClick}
                disabled={disabled || isSubscribed}
              >
                {isSubscribed ? '플랜 구독중' : '변경하기'}
              </Button>
            )}
          </SecureContent>
          <SecureFallback>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-[280px] h-10 pc-screen:h-[46px] pc-screen:w-full"
                  variant={'outline'}
                  disabled={disabled}
                >
                  결제하기
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="text-left">
                  <DialogTitle>멤버십은 작가 회원만 가능합니다.</DialogTitle>
                  <DialogDescription>
                    작가 회원으로 전환하시겠습니까?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">취소</Button>
                  </DialogClose>
                  <DialogClose
                    className={buttonVariants()}
                    asChild
                  >
                    <Link href={PATH.myAuthorApply}>확인</Link>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SecureFallback>
        </Secure>
      )}
    </div>
  );
}

interface AdsCardProps {
  title: string;
  desc: ReactNode;
  benefits: string[];
  src: string;
}

function AdsCard({ title, desc, benefits, src }: AdsCardProps) {
  return (
    <Link href="https://ossified-editorial-3b1.notion.site/1-1-113d24254201802fae9bf242e8f86478">
      <div
        className={`w-full flex flex-col items-center gap-[20px] justify-between p-5 bg-white border-border border rounded-[10px] 
        pc-screen:flex-row pc-screen:p-[40px]`}
      >
        <div className="flex flex-col items-center pc-screen:items-start">
          <div className="typo-body-16-medium-100-tight pc-screen:typo-title-18-medium-100">
            {title}
          </div>
          <span className="typo-title-24-bold-140-tight mt-4 pc-screen:mt-[30px] pc-screen:typo-title-32-bold-150">
            {desc}
          </span>
          <ImageWithFallback
            width={410}
            height={230}
            src={src}
            className="object-cover rounded-[10px] mt-4 pc-screen:hidden"
            alt=""
          />
          <ul className="mt-[20px] space-y-[22px] pc-screen:space-y-0">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-[6px]"
              >
                <Check className="size-[18px]" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <ImageWithFallback
          width={410}
          height={230}
          src={src}
          className="object-cover rounded-[10px] hidden pc-screen:block"
          alt=""
        />
      </div>
    </Link>
  );
}

const ALLOW_USER_IDS = [
  'ba3dfcbb-6846-4144-8d7f-8786a4df3744',
  '826cd63e-f4b8-40ed-b966-3a292241177a',
];
function MembershipTabContent() {
  const { data: myInfo } = useMyInfoQuery();

  const isAllowedUser = ALLOW_USER_IDS.includes(myInfo?.userId ?? '');

  const { data: myMembership } = useMyMembership();
  const myMembershipType = myMembership?.membershipType;

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [targetMembership, setTargetMembership] = useState<MembershipType>();

  const { mutate: changeMembership } = useChangeMembershipMutation();

  const mode =
    myMembership && myMembershipType !== 'FREE' ? 'update' : 'create';

  const openUpdateDialog = (targetMembership: MembershipType) => {
    setTargetMembership(targetMembership);
    setIsUpdateDialogOpen(true);
  };

  const options: MembershipOption[] = [
    ...(mode === 'create'
      ? [
          {
            type: 'FREE',
            href: undefined,
          } as const,
        ]
      : []),
    {
      type: 'LITE',
      href: `${PATH.membershipPayment}?level=LITE`,
    },
    {
      type: 'PLUS',
      href: `${PATH.membershipPayment}?level=PLUS`,
    },
    {
      type: 'VIP',
      href: `${PATH.membershipPayment}?level=VIP`,
      disabled: true,
    },
  ];
  return (
    <>
      <div className="space-y-[60px]">
        <div className="flex flex-col gap-6 pc-screen:flex-row">
          {options.map(({ type, href, disabled }) => (
            <MembershipCard
              key={type}
              type={type}
              href={href}
              disabled={disabled || !isAllowedUser}
              onUpdateClick={() => openUpdateDialog(type)}
              isSubscribed={myMembershipType === type}
              mode={
                myMembership && myMembershipType !== 'FREE'
                  ? 'update'
                  : 'create'
              }
            />
          ))}
        </div>

        <div className="flex flex-col gap-[20px] items-center">
          <div className="typo-body-16-medium-100-tight pc-screen:typo-title-18-medium-100">
            현재 비활성화 되어있지만 곧 오픈 예정이예요!
          </div>
          {/* <div className="typo-title-18-medium-100">
            멤버십 혜택은 작가만 적용 가능합니다.
          </div> */}
          <div className="typo-caption-12-regular-100 text-slate-800 pc-screen:typo-body-14-medium-100-tight">
            서비스는 한 달 단위로 자동 갱신되며, 결제 후 환불은 어렵습니다. 계속
            이용을 원하지 않으실 경우, 다음 결제일 전에 해지를 부탁드립니다.
          </div>
          <div className="text-slate-500 typo-caption-12-regular-100 pc-screen:typo-body-14-medium-100-tight">
            베타 서비스 이후, 멤버십의 구성과 혜택은 상황에 따라 변경될 수
            있습니다.
          </div>
        </div>
      </div>
      {myMembership && !!targetMembership && (
        <MembershipChangeDialog
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          currentMembership={myMembership.membershipType}
          currentEndDate={myMembership.finishedAt}
          targetMembership={targetMembership}
          onConfirm={() => {
            changeMembership({ membershipType: targetMembership });
          }}
        />
      )}
    </>
  );
}

function MembershipChangeDialog({
  open,
  onOpenChange,
  currentMembership,
  currentEndDate,
  targetMembership,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentMembership: MembershipType;
  currentEndDate: string;
  targetMembership: MembershipType;
  onConfirm: () => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="py-[24px] px-[30px]">
        <DialogHeader>
          <DialogTitle>멤버십 변경 신청</DialogTitle>
          <DialogDescription>변경내용을 확인해주세요</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-[30px]">
          {[currentMembership, targetMembership].map((membership) => (
            <div
              className="flex flex-col gap-[10px] items-center w-full"
              key={membership}
            >
              <div className="typo-title-18-bold-100">
                {membership === currentMembership
                  ? '현재 멤버십'
                  : '변경 멤버십'}
              </div>
              <div className="flex flex-col gap-[15px] p-[20px] items-center bg-slate-tint-5 border-border border rounded-[6px] w-full">
                <div
                  className={cn(
                    'typo-body-14-medium-100-tight',
                    membershipVariants({
                      variant: MEMBERSHIP_OPTION[membership].variants,
                    }),
                    'border-none bg-none'
                  )}
                >
                  {MEMBERSHIP_OPTION[membership].title}
                </div>
                <ul className="flex flex-col gap-[15px] items-center">
                  {MEMBERSHIP_OPTION[membership].benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-[6px]"
                    >
                      <Check className="size-[18px]" />
                      <span className="typo-body-14-medium-100-tight">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="typo-body-16-regular-150 text-slate-500 text-center">
          새 맴버십은 결제 주기가 종료되는
          <br />
          {formatDate(currentEndDate, 'yyyy. MM. dd.')} 이후에 시작됩니다.
        </div>

        <DialogFooter className="flex flex-col pt-[24px] border-t-border border-t">
          <DialogClose asChild>
            <Button
              className="w-full"
              onClick={onConfirm}
            >
              변경하기
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full"
            >
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AdsTabContent() {
  const cardProps: AdsCardProps[] = [
    {
      title: 'A Type.메인 상단 배너',
      desc: '문의하기',
      benefits: ['2주 상단 노출 (VAT 별도)', '배너 사이즈: 895x330px'],
      src: '/ads-guide/a-type.png',
    },
    {
      title: 'B Type.메인 하단 배너',
      desc: '문의하기',
      benefits: [
        '2주 하단 노출 (VAT 별도)',
        '1번 배너 사이즈 : 386x600px (세로형)',
        '2번 배너 사이즈 : 386x386px (정방향)',
        '3번 배너 사이즈 : 386x194px (가로형)',
        '4번 배너 사이즈 : 386x386px (정방향)',
        '5번 배너 사이즈 : 386x194px (가로형)',
      ],
      src: '/ads-guide/b-type.png',
    },
  ];
  return (
    <div className="flex flex-col w-full gap-[30px]">
      {cardProps.map((props) => (
        <AdsCard
          key={props.title}
          {...props}
        />
      ))}
      <div className="flex flex-col justify-between items-center gap-y-2 border-pink-100 text-pink-500 bg-pink-tint-5 rounded-[4px] p-[20px]  pc-screen:flex-row">
        <span className="typo-body-14-regular-150-tight">
          광고 배너 같은 경우 문의를 통해 이용 부탁드립니다.
        </span>
        <Link href="https://ossified-editorial-3b1.notion.site/1-1-113d24254201802fae9bf242e8f86478">
          <Button className="w-20 pc-screen:w-[140px]">문의하기</Button>
        </Link>
      </div>
    </div>
  );
}

export default function GuideTabSection() {
  const [activeTab, setActiveTab] = useState<TabType>(MEMBERSHIP);

  return (
    <section className="flex flex-col items-center gap-6 pc-screen:gap-[30px]">
      <h1 className="text-center typo-title-20-bold-140 pc-screen:typo-title-32-bold-150">
        가격 안내
      </h1>

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === MEMBERSHIP && <MembershipTabContent />}
      {activeTab === ADVERTISEMENT && <AdsTabContent />}
    </section>
  );
}
