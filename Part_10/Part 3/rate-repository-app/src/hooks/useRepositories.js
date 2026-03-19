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

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });
  return {
    repositories: data ? data.repositories : null,
    loading,
    error,
  };
};


export default useRepositories;