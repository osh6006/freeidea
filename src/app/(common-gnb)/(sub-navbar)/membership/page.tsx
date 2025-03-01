import BottomBanner from '@/components/home/buttom-banner';
import GuideTabSection from '@/components/membership/guide-tab';

export default function Page() {
  return (
    <>
      <main className="w-dvw px-5 pt-10 pb-[104px] max-w-[1200px] mx-auto pc-screen:pt-[100px] pc-screen:pb-[200px] pc-screen:px-0 ">
        <GuideTabSection />
      </main>
      <BottomBanner />
    </>
  );
}
