import { doc, file, project } from 'hardocs-fs';
import { join } from 'path';
import Pouchdb from 'pouchdb';
// import { v4 } from 'uuid';

export const schemaDB = new Pouchdb('schemas');

export default {
  /**
   * Create a new hardocs project
   * @param {Object} projectMetadata
   */
  async createNewProject(projectMetadata) {
    const data = {
      createProject: await project.create(projectMetadata)
    };

    return {
      data
    };
  },

  /**
   * Open a hardocs project in hardocs desktop app.
   * @param {String} path
   */
  async getProject(path) {
    const openProject = await project.open({ path });

    return {
      data: {
        openProject
      }
    };
  },

  /**
   * Saves any kind of file to the file system.
   */
  async writeFile(basePath, fileMetadata) {
    fileMetadata.path = join(basePath, fileMetadata.path);
    const res = {
      data: {
        writeToFile: await file.writeToFile(fileMetadata)
      }
    };
    return res;
  },

  /**
   * Deletes a document from a hardocs project.
   */
  async deleteFile(hardoc, state) {
    if (hardoc && hardoc.fileName) {
      await doc.removeFromManifest(state.cwd, hardoc.fileName);
    }
    return {
      data: {
        deleteFile: file.delete(join(state.cwd, hardoc.path))
      }
    };
  },

  /**
   * Loads and extracts a schema content into a hardocs project.
   */
  async loadSchema() {
    return {
      data: {
        loadSchema: await doc.loadSchema()
      }
    };
  },

  /**
   * Sa
   */
  async saveDoc(basePath, data) {
    const response = await doc.processDoc({
      path: basePath,
      title: data.title,
      docsDir: data.docsDir
    });
    data.path = join(basePath, response.path);
    const res = {
      data: {
        writeToFile: await file.writeToFile(data)
      }
    };
    return res;
  },

  async addMetadata(state, data) {
    const addMetadata = await doc.addMetadata(
      { docsDir: state.docsFolder, path: state.cwd },
      data
    );

    return {
      data: { addMetadata }
    };
  }
};
