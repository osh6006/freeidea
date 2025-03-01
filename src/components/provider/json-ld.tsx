import { PATH } from '@/constants/path';
import { getRecommendWorks } from '@/service/home/service';

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

export default async function JsonLd() {
  const generateJsonLd = async () => {
    const recommendWorks = await getRecommendWorks();

    const items = recommendWorks.list.map(
      ({ productId, productImageUrl, title }, index) => ({
        '@type': 'ListItem',
        name: title,
        position: index + 1,
        image: productImageUrl,
        url: `${BASE_URL}${PATH.workDetail(productId)}`,
      })
    );

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items,
    };
  };

  const jsonLd = await generateJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
