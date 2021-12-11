import { extractCritical } from '@emotion/server';
import { EmotionCritical } from '@emotion/server/types/create-instance';
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import site from '~/site.config';

export default class Document extends NextDocument<EmotionCritical> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}

          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }

  render(): JSX.Element {
    return (
      <Html lang={site.html.lang}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="tracking-wide transition-colors dark:text-gray-300 dark:bg-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
