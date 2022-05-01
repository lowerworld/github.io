import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import Header from '~/components/header';
import site from '~/site.config';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{site.html.title}</title>

        {site.html.description && (
          <meta name="description" content={site.html.description} />
        )}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              const dark = localStorage.theme === 'dark';
              document.documentElement.classList[dark ? 'add' : 'remove']('dark');
            `,
          }}
        />
      </Head>

      <Global
        styles={css`
          a,
          button {
            -webkit-tap-highlight-color: transparent;
          }
        `}
      />

      <Header />

      <div className="pt-14">
        <Component {...pageProps} />
      </div>
    </>
  );
}

enum Theme {
  light = 'light',
  dark = 'dark',
}

export function toggleTheme(): void {
  const dark = localStorage.theme === Theme.dark;
  document.documentElement.classList[dark ? 'remove' : 'add'](Theme.dark);
  localStorage.theme = dark ? Theme.light : Theme.dark;
}
