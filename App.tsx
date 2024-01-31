import React, { useEffect } from 'react';
// import Navigation from './src/navigation/Navigation';
import AuthScreen from './src/screen/authScreens/mainScreen/AuthScreen';                                                                                             
import SplashScreen from 'react-native-splash-screen';
// import Forgot from './src/screen/authScreens/forget/Forget';
// import Login from './src/screen/authScreens/login/Login';
// import SignUp from './src/screen/authScreens/signUp/Signup';

function App(): React.JSX.Element {
  useEffect(() => {

    const hideSplashScreen = () => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    };
    const timeoutId = setTimeout(hideSplashScreen, 3000);
   return () => clearTimeout(timeoutId);
  }, []);
  return (
  <>
  
      {/* <Login/>
      <SignUp/>
      <Forgot/> */}
      <AuthScreen/>
    </>
  );
}

export default App;
