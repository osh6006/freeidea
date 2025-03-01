'use client';

import { useHomeAuthorCuration } from '@/service/home/use-service';

import CurationCard from './curation-card';
import SectionTitle from './section-title';
import CurationSkeleton from './skeleton/curation-skeleton';

const AuthorCuration = () => {
  const { data, isLoading } = useHomeAuthorCuration();

  return (
    <section className="mt-[60px]">
      <SectionTitle>작가 큐레이션</SectionTitle>
      {isLoading ? (
        <CurationSkeleton />
      ) : (
        <ul className="mt-[20px] grid grid-cols-1 pc-screen:grid-cols-4 gap-[20px] ">
          {data?.map((curation, i) => (
            <li key={curation.curationId + i}>
              <CurationCard {...curation} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AuthorCuration;
