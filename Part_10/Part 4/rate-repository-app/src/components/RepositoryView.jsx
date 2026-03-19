import { Pressable, View, FlatList } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

const RepositoryInfo = ({ repository }) => {
  return(
  <View>
      <RepositoryItem item={repository} >
      <Pressable onPress={() => Linking.openURL(repository.url)} style={{ display: 'block', backgroundColor: '#0366d6', padding: 10, borderRadius: 5, marginTop: 10, textAlign: 'center' }}>
        <Text color="textWhite" fontWeight='bold' >Open in GitHub</Text>
      </Pressable>
      </RepositoryItem>
    </View>
  );
};

export const ReviewItem = ({ review, children }) => {
  return (
    <View style={{
          padding: 15,
          flexDirection: 'column',
          backgroundColor: '#fff',
          marginBottom: 10,
          marginTop: 10,
        }}>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View style={{borderRadius: 25, borderColor: '#0366d6', borderWidth: 2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
        <Text fontWeight='bold' >{review.rating}</Text>
        </View>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <Text fontWeight='bold'>{review.user.username}</Text>
          <Text color='textSecondary'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={{ flexShrink: 1 }}>{review.text}</Text>
        </View>
      </View>
      {children && <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>{children}</View>}
    </View>
  );
};
const RepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first: 2 },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching repository</Text>;
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id: id,
        first: 2
      },
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />

  );
};

export default RepositoryView;