import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AuthContextProvider from './src/context/AuthContext';
import AuthNavigation from './src/navigation/AuthNavigation';
import {Provider} from 'react-redux';
import Store from './src/redux/Store';

function App() {
  useEffect(() => {
    const hideSplashScreen = () => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    };
    const timeoutId = setTimeout(hideSplashScreen, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const Stack = createStackNavigator();

  return (
    <>
      <Provider store={Store}>
        {/* <AuthContextProvider> */}
        <AuthNavigation />
        {/* </AuthContextProvider> */}
      </Provider>
    </>
  );
}

export default App;
