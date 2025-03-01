import * as React from 'react';

interface IHightLightWordProps {
  text: string; // 전체 텍스트
  highlight: string; // 하이라이트할 부분
}

const HightLightWord: React.FunctionComponent<IHightLightWordProps> = ({
  text,
  highlight,
}) => {
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className="font-medium text-[14px] tracking-base">
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark
            key={index}
            className="text-pink-500 bg-transparent"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HightLightWord;
