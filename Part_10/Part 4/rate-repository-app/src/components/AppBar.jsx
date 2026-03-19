import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: theme.colors.AppBar,
  },
  tab: {
    padding: 10,
    color: theme.colors.textWhite,
  },
  
});

const AppBar = () => {
  const signOut = useSignOut();

  const { data } = useQuery(GET_AUTHORIZED_USER);
  const authorizedUser = data ? data.me : null;

  return (
    <Pressable onPress={() => console.log('AppBar pressed')}>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <AppBarTab
            title='Rate Repositories App'
            onPress={() => console.log('Rate Repositories App pressed')}
          />
          <Link to='/' as >
              <AppBarTab
                title='Repositories'
              />
          </Link>
          <Link to='/createreview' as >
              <AppBarTab
                title='Create a review'
              />
          </Link>
          {authorizedUser ? (
              <>
              <Link to='/myreviews' as >
                  <AppBarTab
                    title='My reviews'
                  />
              </Link>
              <Pressable onPress={() => signOut()}>
                <AppBarTab
                  title='Sign Out'
                />
              </Pressable>
              </>
          ) : (
            <>
            <Link to='/signin'>
                <AppBarTab
                  title='Sign In'
                />
            </Link>
            <Link to='/signup'>
                <AppBarTab
                  title='Sign Up'
                />
            </Link>
            </>
          )}
        </ScrollView>
      </View>
    </Pressable>
  );
};


const AppBarTab = ({ title }) => {
  return (
      <Text color='textPrimary' fontSize='subheading' style={styles.tab}>
        {title}
      </Text>
  );
};

export default AppBar;