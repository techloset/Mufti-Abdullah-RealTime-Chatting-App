import {useEffect} from 'react';
// import Navigation from './src/navigation/Navigation';
// import AuthScreen from './src/screen/authScreens/mainScreen/AuthScreen';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigation/TabNavigation';
import StackNavigation from './src/navigation/StackNavigation';
import AuthContextProvider, {useAuthContext} from './src/context/AuthContext';
// import Forgot from './src/screen/authScreens/forget/Forget';
// import Login from './src/screen/authScreens/login/Login';
// import SignUp from './src/screen/authScreens/signUp/Signup';

function App(): React.JSX.Element {
  const {isAuth, user} = useAuthContext();
  console.log('isAuth', isAuth);

  useEffect(() => {
    const hideSplashScreen = () => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    };
    const timeoutId = setTimeout(hideSplashScreen, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <AuthContextProvider>
        {/* <Navigation/> */}
        {isAuth ? <Navigation /> : <StackNavigation />}
        {/* <Login/>
      <SignUp/>
    <Forgot/> */}
        {/* <AuthScreen/> */}
      </AuthContextProvider>
    </>
  );
}

export default App;
