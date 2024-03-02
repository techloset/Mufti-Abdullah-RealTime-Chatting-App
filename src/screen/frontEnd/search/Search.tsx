import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './SearchStyles';
import {SEARCHPAGEICON} from '../../../constants/assets/AllImages';
import useSearch from './useSearch';
import SearchUser from '../../../components/searchUser/SearchUser';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList, HomeUser} from '../../../constants/Types';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import Loader from '../../../components/loader/Loader';
import {COLORS} from '../../../constants/colors/Color';
interface navigationProps {
  navigation: StackNavigationProp<HomeStackParamsList, 'HOMEPAGE'> & {
    navigate(screen: string, params: {userDetails: HomeUser}): void;
  };
}
export default function Search({navigation}: navigationProps) {
  const {handleSearch, query, setQuery, loading, usersData} = useSearch();
  const navigateToChatScreen = (userDetails: HomeUser) => {
    navigation.navigate('CHATSCREEN', {userDetails});
  };
  const renderItem = ({item}: {item: FirebaseFirestoreTypes.DocumentData}) => {
    const user: HomeUser = {
      photoURL: item.photoURL,
      username: item.username,
      status: item.status,
      lastSeen: item.lastSeen,
      timeAgo: item.timeAgo,
      description: item.description,
      id: item.id,
      uid: item.uid,
      imageUrl: item.imageUrl,
    };
    return (
      <TouchableOpacity onPress={() => navigateToChatScreen(user)}>
        <SearchUser
          photoURL={user.photoURL}
          username={user.username}
          status={user.status}
          key={user.id}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.searchView}>
        <SEARCHPAGEICON.SearchBlack style={styles.searchImage} />
        <TextInput
          placeholder="Search"
          style={styles.Input}
          placeholderTextColor="black"
          onChangeText={handleSearch}
          value={query}
        />
        <TouchableOpacity onPress={() => setQuery('')}>
          <SEARCHPAGEICON.Remove style={styles.removeImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.HeadingView}>
        <Text style={styles.PeopleText}>People</Text>
        {loading ? (
          <ActivityIndicator size={'large'} color={COLORS.BLACK} />
        ) : (
          <>
            <FlatList
              data={usersData}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </>
        )}
      </View>
      <View style={styles.HeadingView}>
        <Text style={styles.GroupText}>Group Chat</Text>
      </View>
    </>
  );
}
