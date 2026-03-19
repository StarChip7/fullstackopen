import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: theme.colors.primary,
  },
  tab: {
    padding: 10,
  },
  
});

const AppBar = () => {
  return (
    <Pressable onPress={() => console.log('AppBar pressed')}>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <AppBarTab
              title="Rate Repositories App"
              onPress={() => console.log('Rate Repositories App pressed')}
            />
          <Link to="/">
            <AppBarTab
              title="Repositories"
              onPress={() => console.log('Repositories pressed')}
            />
          </Link>
          <Link to="/signin">
            <AppBarTab
              title="Sign In"
              onPress={() => console.log('Sign In pressed')}
            />
          </Link>
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