import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserData} from '../../../constants/Types';
import {useDispatch} from 'react-redux';
import {login} from '../../../store/slices/AuthSlice';
import {ShowToast} from '../../../components/toast/ShowToast';

GoogleSignin.configure({
  webClientId:
    '880655244940-tggqp0tccp4liuaj3r69m97hr9ljllds.apps.googleusercontent.com',
  scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '',
  profileImageSize: 120,
});

export default function UseAuthScreen() {
  const dispatch = useDispatch();
  const LoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const userData = {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
        uid: userCredential.user.uid,
        creationTime: userCredential.user.metadata.creationTime,
      };
      await firestore().collection('users').doc(userCredential.user.uid).set({
        username: userData.displayName,
        email: userData.email,
        uid: userData.uid,
        password: '',
        confirmPassword: '',
        photoURL: userData.photoURL,
        creationTime: userData.creationTime,
        status: 'Active',
        lastSeen: new Date().toLocaleDateString(),
      });
      dispatch(login(userData as UserData));
      console.log('Success', 'User SignUp Successfully', 'success');
      ShowToast('sucess', 'User SignUp Successfully');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };
  return {LoginWithGoogle, GoogleSignin};
}
