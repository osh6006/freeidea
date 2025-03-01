import OauthProcessing from './oauth-processing';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [{ sns: 'kakao' }, { sns: 'twitter' }];
}

export default function OauthProcessingPage() {
  return <OauthProcessing />;
}
