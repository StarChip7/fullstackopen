import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $order: AllRepositoriesOrderBy
    $direction: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $order
      orderDirection: $direction
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_CURRENT_USER_REVIEWS = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository{
              url
            }
          }
        }
      }
    }
  }
`;

export default GET_REPOSITORIES;