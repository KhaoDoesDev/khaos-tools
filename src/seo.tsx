
import { Helmet } from 'react-helmet-async';
export const Seo = ({ title, slug, description }: { title: string, slug?: string, description: string }) => {
  if (slug) title += " | " + slug;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};