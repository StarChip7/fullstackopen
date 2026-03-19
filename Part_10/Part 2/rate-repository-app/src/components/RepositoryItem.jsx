import { View, Image, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.infoContainer}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.languageContainer}>
          <Text style={styles.language}>{item.language}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>{item.stargazersCount}</Text>
            <Text style={styles.statLabel}>Stars</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>{item.forksCount}</Text>
            <Text style={styles.statLabel}>Forks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>{item.reviewCount}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statCount}>{item.ratingAverage}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  fullName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  description: {
    fontSize: theme.fontSizes.body,
    marginBottom: 10,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  language: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  statLabel: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
});