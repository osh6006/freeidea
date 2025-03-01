import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/constants/path';

function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh w-dvw flex items-center justify-center ">
      <div className="px-[100px] py-[60px] border border-slate-200 my-[100px] rounded-[20px]">
        <Link href={PATH.home}>
          <Image
            alt="logo"
            sizes="100vw"
            height={50}
            width={190}
            src="/logo-typo.png"
            className="rounded-[8px] mx-auto cursor-pointer"
          />
        </Link>
        {children}
      </div>
    </main>
  );
}

export default SignUpLayout;
