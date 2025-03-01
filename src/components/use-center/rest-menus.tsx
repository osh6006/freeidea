import * as React from 'react';

import Inner from '@/components/common/inner';

interface IUseCenterRestMenusProps {}

const ItemWrapper =
  'bg-white p-[20px] flex-1 border border-slate-200 rounded-[6px]';
const ItemTitle =
  'text-slate-700 text-center text-base font-bold tracking-[0.32px]';
const ItemUL = 'mt-[30px] space-y-[10px]';
const ItemLI = 'text-sm tracking-[0.28px] text-slate-700 py-[7.5px]';

const UseCenterRestMenus: React.FunctionComponent<
  IUseCenterRestMenusProps
> = () => {
  return (
    <section className=" w-screen bg-slate-50 mt-[200px] py-[80px]">
      <Inner maxWidth={1200}>
        <div className="flex items-center max-w-[1200px] justify-between gap-x-[30px]">
          <div className={ItemWrapper}>
            <div className={ItemTitle}>공지사항</div>
            <ul className={ItemUL}>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
            </ul>
          </div>
          <div className={ItemWrapper}>
            <div className={ItemTitle}>업데이트</div>
            <ul className={ItemUL}>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
            </ul>
          </div>
          <div className={ItemWrapper}>
            <div className={ItemTitle}>자주하는 질문</div>
            <ul className={ItemUL}>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
              <li className={ItemLI}>
                {`[이벤트] 프리디어 월간 이벤트 공지}`}
              </li>
            </ul>
          </div>
        </div>
      </Inner>
    </section>
  );
};

export default UseCenterRestMenus;
