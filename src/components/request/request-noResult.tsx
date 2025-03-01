import { Button } from '../ui/button';

interface IRequestNoResultProps {
  value: string;
}

const RequestNoResult = ({ value }: IRequestNoResultProps) => {
  return (
    <div className="flex flex-col items-center pt-[146px] h-[563px] border-[1px] border-r-transparent border-l-transparent">
      <div className="flex gap-[2px] text-[24px] text-slate-800 font-[700]">
        <span>{value}</span>
        <span>에 대한 검색결과가 없습니다.</span>
      </div>
      <div className="text-[16px] pt-[30px] pb-[40px] text-slate-500 font-[500]">
        위 검색어에 대한 의뢰글을 먼저 남겨보시겠어요?
      </div>
      <Button className="w-[300px] h-[54px] text-[16px] py-[19px] font-[500]">
        의뢰하기
      </Button>
    </div>
  );
};

export default RequestNoResult;
