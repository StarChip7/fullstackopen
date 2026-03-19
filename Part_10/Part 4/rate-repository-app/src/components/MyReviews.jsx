import { Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER_REVIEWS } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ReviewItem } from './RepositoryView';
import { FlatList } from 'react-native';
import Text from './Text';
import * as Linking from 'expo-linking';

const style = {
  viewButton: {
    backgroundColor: '#0366d6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
};

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  }
  );

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_CURRENT_USER_REVIEWS, variables: { includeReviews: true } }]
  });

  const onDeleteReview = (id) => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteReview({ variables: { id } }) }
      ]
    );
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.me.reviews.edges.map(edge => edge.node)}
      renderItem={({ item }) => (
          <ReviewItem review={item} >
            <Pressable style={style.viewButton} onPress={()=> {Linking.openURL(item.repository.url)}}><Text color='textWhite'>View Repository</Text></Pressable>
            <Pressable style={style.deleteButton} onPress={()=> {onDeleteReview(item.id)}}><Text color='textWhite'>Delete Review</Text></Pressable>
          </ReviewItem>
        )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;