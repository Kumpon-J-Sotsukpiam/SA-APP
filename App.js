import React from 'react';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import { store } from './src/store'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    const imageAssets = cacheImages([require('./assets/imgs/bg.png'),require('./assets/imgs/registerbg.png')])
    await Promise.all([...imageAssets]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

}

export default App