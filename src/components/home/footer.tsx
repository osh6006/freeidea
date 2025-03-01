'use client';

import Image from 'next/image';
import Link from 'next/link';

import Inner from '@/components/common/inner';
import { Separator } from '@/components/ui/separator';
import { EXTERNAL_PATH } from '@/constants/path';

const Footer = () => {
  return (
    <footer className="flex w-full px-[20px] main-desktop:px-0 border-t-[1px] border-t-main-gray-200 pb-[40px] py-[40px]">
      <Inner
        maxWidth={1200}
        className="mx-auto flex flex-col w-full"
      >
        <div className="flex w-full justify-between flex-col pc-screen:flex-col">
          <Image
            width={176}
            height={38}
            sizes="176px"
            src="/pngs/footer-logo.png"
            alt="footer-logo"
          />
          <div className="flex gap-[16px] typo-body-14-semi-bold-100-tight text-slate-800 mt-6 pc-screen:mp-0">
            <a href={EXTERNAL_PATH.termsOfService}>이용약관</a>
            <a href={EXTERNAL_PATH.privacyPolicy}>개인정보처리방침</a>
            <a href={EXTERNAL_PATH.businessInfo}>사업자정보확인</a>
            <a href={EXTERNAL_PATH.supportCetner}>이용센터</a>
          </div>
        </div>

        <div className="mt-[30px] text-slate-500 typo-caption-12-regular-100 space-y-[10px]">
          <div className="flex items-center ">
            <span className="border-r border-slate-300 pr-[10px]">
              아트디어
            </span>
            <div className="pl-[10px]">대표 : 유시원</div>
          </div>
          <div>주소 : 경기도 평택시 평택5로34번길 48, 4층 402호 186A호</div>
          <div className="flex items-center flex-wrap gap-[10px]">
            <span className="border-r border-slate-300 pr-[10px]">
              사업자등록번호 : 378-15-02754
            </span>
            <span className="">메일 : freeidea@freeidea.kr</span>
            <span className="border-l border-slate-300 pl-[10px]">
              통신판매신고번호 : 제 2024-경기평택-1216 호
            </span>
          </div>
          <div>호스팅 제공자 : Amazon Web Services</div>
          <div>연락처 : 010 2783 0586</div>
        </div>
        <div className="w-[235px] mt-[30px] typo-caption-12-bold-100-tight text-slate-500 pc-screen:w-full">
          프리디어에 게시된 모든 작품의 저작권은 해당 작가에게 있으며, 거래는
          거래 당사자 간의 책임 하에 이루어집니다. 프리디어는 거래 과정에서
          발생하는 문제에 대해 책임지지 않습니다.
        </div>
        <Separator className="my-6 pc-screen:my-[30px]" />
        <div className="flex flex-col  typo-caption-12-regular-100 text-slate-400 pc-screen:mt-0 pc-screen:flex-row pc-screen:items-center pc-screen:justify-between">
          <span>Copyright ⓒ FREEIDEA All Rights Reserved.</span>
          <span className="w-full flex mt-5 flex-1 pc-screen:mt-0 pc-screen:items-end pc-screen:justify-end">
            <div className="flex gap-[12px]">
              <Link
                href={'https://instagram.com/freeidea_art'}
                passHref={true}
                target="_blank"
              >
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#F2F2F2]">
                  <Image
                    src="/icons/sns/instagram.svg"
                    alt="instagram"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>
              <Link
                href={'http://pf.kakao.com/_ExnmGG'}
                passHref={true}
                target="_blank"
              >
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#F2F2F2]">
                  <Image
                    src="/icons/sns/kakao.svg"
                    alt="kakao"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>
              <Link
                href={'https://x.com/freeidea_art'}
                passHref={true}
                target="_blank"
              >
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#F2F2F2]">
                  <Image
                    src="/icons/sns/x.svg"
                    alt="x"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>
            </div>
          </span>
        </div>
      </Inner>
    </footer>
  );
};

export default Footer;
