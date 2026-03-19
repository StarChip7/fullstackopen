import { FlatList, View, Button } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { Menu, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import React from 'react';

// const ItemSeparator = () => <View style={styles.separator} />;

// export const RepositoryListContainer = ({ repositories, setOrder }) => {
//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];

//   return (
//     <FlatList
//       style={{ flex: 1 }}
//       data={repositoryNodes}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={({ item }) => <RepositoryItem item={item} />}
//       ListHeaderComponent={<RepositoryFilter setOrder={setOrder} />}
//     />
//   );
// };

export class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    return (
      <View>
        <SearchContainer setSearchQuery={this.props.setSearchQuery} searchQuery={this.props.searchQuery} />
        <RepositorySort setOrder={this.props.setOrder} />
      </View>
    );
  }

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        style={{ flex: 1 }}
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { repositories, loading, error, fetchMore } = useRepositories({
    order,
    searchKeyword : debouncedSearchQuery,
    first : 8
  });


  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching repositories</Text>;
  }  

  return (
    <View style={{ flex: 1 }}>
        <RepositoryListContainer repositories={repositories} setOrder={setOrder} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onEndReached={()=>{fetchMore()}}/>
      </View>
  );
  
};

const SearchContainer = ({ setSearchQuery, searchQuery }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Searchbar placeholder='Search' style={{ width: '100%' }} onChangeText={setSearchQuery} value={searchQuery} />
        
      </View>
);
};


const RepositorySort = ({setOrder}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button onPress={openMenu} title='Sort repositories' style={ { margin: 2 } } />}
    >
      <Menu.Item onPress={() => {setOrder('latest')}} title='Latest repositories' />
      <Menu.Item onPress={() => {setOrder('highestRated')}} title='Highest rated repositories' />
      <Menu.Item onPress={() => {setOrder('lowestRated')}} title='Lowest rated repositories' />
    </Menu>
  );
};

export default RepositoryList;