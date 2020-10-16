import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import {cwd} from 'hardocs-fs'
import gql from 'graphql-tag';
import { project, cwd, file } from 'hardocs-fs';

const httpLink = createHttpLink({
  uri: 'http://localhost:4001/graphql'
});

// Cache implementation
const cache = new InMemoryCache();

const apiClient = new ApolloClient({
  link: httpLink,
  cache
});

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

export default {
  async getCWD() {
    return {
      data: {
        cwd: cwd.get()
      }
    };
  },

  /**
   * @param {Object} projectMetadata
   */
  async createNewProject(projectMetadata) {
    return {
      data: {
        createProject: await project.create(projectMetadata)
      }
    };
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
    const res = {
      data: {
        writeToFile: file.writeToFile(fileMetadata)
      }
    };
    console.log({ res, fileMetadata });
    return res;
  },

  /**
   * @param {String} path
   */
  deleteFile(path) {
    return {
      data: {
        deleteFile: file.delete({ filePath: path })
      }
    };
  }
};
