import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_CLIENT_URL !== 'https://www.freeidea.kr') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/mypage/',
        '/admin/',
        '/write/',
        '/membership/',
        '/sign-up/',
        '/oauth/',
        '/search/',
      ],
    },
  };
}
