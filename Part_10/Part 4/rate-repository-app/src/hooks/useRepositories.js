// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_REPOSITORIES from '../graphql/queries';

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     // Replace the IP address part with your own IP address!
//     const response = await fetch('http://localhost:5000/api/repositories');
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

const useRepositories = (variables) => {

  const { order, searchKeyword, first } = variables;

  let orderDirection = 'DESC';
  let orderBy = 'CREATED_AT';

  switch (order) {
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    case 'highestRated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowestRated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    default:
      orderBy = null;
      orderDirection = null;
  }

  const { data, loading, error, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { order : orderBy, direction: orderDirection, searchKeyword: searchKeyword, first: first },
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        order: orderBy,
        direction: orderDirection,
        searchKeyword: searchKeyword,
        first: first
      },
    });
  };

  return {
    repositories: data ? data.repositories : null,
    loading,
    error,
    fetchMore: handleFetchMore,
    ...result
  };
};


export default useRepositories;