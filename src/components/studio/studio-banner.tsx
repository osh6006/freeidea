import Image from 'next/image';

import { BLUR_IMG } from '@/constants/common';
import { faker } from '@faker-js/faker';
import { Image01 } from '@untitled-ui/icons-react';

import Inner from '../common/inner';
import { Button } from '../ui/button';

const StudioBanner = () => {
  return (
    <section className="h-[320px] relative ">
      <Image
        src={faker.image.urlPicsumPhotos({
          width: 2048,
          height: 320,
        })}
        fill
        placeholder="blur"
        blurDataURL={BLUR_IMG}
        alt="studio-banner"
        style={{
          objectFit: 'cover',
        }}
      />
      <Inner
        maxWidth={1200}
        className="relative h-full"
      >
        <Button
          variant="outline"
          className="p-[12px] w-[40px] h-[40px] absolute bottom-[20px] right-0"
        >
          <Image01 />
        </Button>
      </Inner>
    </section>
  );
};

export default StudioBanner;
