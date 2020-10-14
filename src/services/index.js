import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import {cwd} from 'hardocs-fs'
import gql from 'graphql-tag';
import { project } from 'hardocs-fs';

const httpLink = createHttpLink({
  uri: 'http://localhost:4001/graphql'
});

// Cache implementation
const cache = new InMemoryCache();

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
  }
`;

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

const WRITE_FILE = gql`
  mutation writeToFile($input: FileInput!) {
    writeToFile(input: $input) {
      path
    }
  }
`;

const DELETE_FILE = gql`
  mutation deleteFile($filePath: String!) {
    deleteFile(filePath: $filePath)
  }
`;

export default {
  getCWD() {
    return apiClient.mutate({
      mutation: CWD
    });
  },

  /**
   * @param {Object} projectMetadata
   */
  createNewProject(projectMetadata) {
    return apiClient.mutate({
      mutation: CREATE_NEW_PROJECT,
      variables: {
        input: projectMetadata
      }
    });
  },

  /**
   * @param {Object} projectMetadata
   */
  createProjectFromExisting(projectMetadata) {
    return apiClient.mutate({
      mutation: CREATE_PROJECT_FROM_FOLDER,
      variables: {
        input: projectMetadata
      }
    });
  },

  /**
   * @param {String} path
   */
  async getProject(path) {
    return {
      data: {
        openProject: await project.open({ path })
      }
    };
  },

  /**
   * @param {Object} fileMetadata
   */

  writeFile(fileMetadata) {
    return apiClient.mutate({
      mutation: WRITE_FILE,
      variables: {
        input: fileMetadata
      }
    });
  },

  /**
   * @param {String} path
   */
  deleteFile(path) {
    return apiClient.mutate({
      mutation: DELETE_FILE,
      variables: {
        filePath: path
      }
    });
  }
};
