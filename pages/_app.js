// pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    if (ctx.isServer) {
      pageProps.title = process.env.UISVR_APPTITLE;
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>{pageProps.title}</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);