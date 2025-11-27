import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Welcome
      </h1>
      <p className="text-lg text-gray-700">
        {t('meta_description')}
      </p>
      <div className="mt-8 p-4 bg-blue-100 rounded-lg">
        <p className="text-blue-800">If you can see this blue box, Tailwind CSS is working!</p>
      </div>
    </div>
  );
};
