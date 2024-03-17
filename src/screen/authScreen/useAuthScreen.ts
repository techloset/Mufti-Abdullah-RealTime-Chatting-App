import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserData} from '../../constants/types/Types';
import {useDispatch} from 'react-redux';
import {login} from '../../store/slices/AuthSlice';
import {ShowToast} from '../..//components/toast/ShowToast';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/FirebaseCollectoin';

GoogleSignin.configure({
  webClientId:
    '880655244940-tggqp0tccp4liuaj3r69m97hr9ljllds.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
  accountName: '',
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
      await firestore()
        .collection(FIREBASE_COLLECTIONS.USER)
        .doc(userCredential.user.uid)
        .set({
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
