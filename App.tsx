import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigation from './src/navigation/authNavigation';
import {Provider} from 'react-redux';
import Store from './src/store/store';
import {ToastProvider} from 'react-native-toast-notifications';
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
      <ToastProvider>
        <Provider store={Store}>
          {/* <AuthContextProvider> */}
          <AuthNavigation />
          {/* </AuthContextProvider> */}
        </Provider>
      </ToastProvider>
    </>
  );
}

export default App;
