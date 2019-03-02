import React from 'react';
import initializeState from '../api';
import Root from '../components/Root';

class Home extends React.Component {
  static async getInitialProps(ctx) {
    const { store, isServer } = ctx;
    if (isServer) {
      // set up DEBUG flag for server side
      global.DEBUG = (process.env.UISVR_DEBUG === 'true');
      // loading the state on server side
      await initializeState(store, ctx);
    }
    return { };
  }

  render() {
    return (<Root />);
  }
}

export default Home;
