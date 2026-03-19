import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import RepositoryView from './RepositoryView';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repositories/:id" element={<RepositoryView />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;