import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {ShowToast} from '../../components/toast/ShowToast';

export default function useForget() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        ShowToast('sucess', 'link sent successfully to your Email');
        setEmail('');
        console.log('link sent successfully');
        setLoading(false);
      })
      .catch(error => {
        console.log('server error');
        setLoading(false);
        console.error(error);
      });
  };
  return {handleSubmit, email, loading, setEmail};
}
