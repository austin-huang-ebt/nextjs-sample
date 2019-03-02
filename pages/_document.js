// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const docScript = `
      // set up DEBUG flag for browser side
      DEBUG = ${process.env.UISVR_DEBUG};
      // pass configuration from environment variables down to browser
      __APISERVER__ = "${process.env.UISVR_APISERVER}";
    `;
    return (
      <html>
        <Head>
          {/* https://github.com/zeit/next.js/issues/2468#issuecomment-313074034 */}
          <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js' />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: docScript }} />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
