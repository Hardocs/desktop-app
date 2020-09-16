import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4001/graphql'
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apiClient = new ApolloClient({
  link: httpLink,
  cache
});

const CWD = gql`
  query {
    cwd
  }
`;

const CREATE_NEW_PROJECT = gql`
  mutation createProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    path
    name
    shortTitle
    allDocsData {
      title
      fileName
      content
    }
  }
}`;

const CREATE_PROJECT_FROM_FOLDER = gql`
  mutation($input: CreateProjectInput!) {
  createProjectFromExisting(input: $input) {
    path
    name
    shortTitle
    allDocsData {
      title
      fileName
      content
    }
  }
}
`;

const OPEN_PROJECT = gql`
  mutation($path: String!) {
    openProject(path: $path) {
      id
      path
      name
      shortTitle
      nameWithOwner
      allDocsData {
        title
        fileName
        content
      }
    }
  }
`;

export default {
  getCWD() {
    return apiClient.mutate({
      mutation: CWD
    });
  },

  createNewProject(projectMetadata){
    return apiClient.mutate({
      mutation: CREATE_NEW_PROJECT,
      variables:{
        input: projectMetadata
      }
    })
  },

  createProjectFromFolder(projectMetadata){
    return apiClient.mutate({
      mutation: CREATE_PROJECT_FROM_FOLDER,
      variables:{
        input: projectMetadata
      }
    })
  },


  getProject(path) {
    return apiClient.mutate({
      mutation: OPEN_PROJECT,
      variables: {
        path: path
      }
    });
  }
};
