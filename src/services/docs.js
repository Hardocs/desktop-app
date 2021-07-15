import { doc, file, project } from 'hardocs-fs';
import { join } from 'path';
import Pouchdb from 'pouchdb';
// import { v4 } from 'uuid';

export const schemaDB = new Pouchdb('schemas');

export default {
  /**
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
   * @param {Object} fileMetadata
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
   * @param {String} path
   */
  async deleteFile(hardoc, state) {
    // if (hardoc && hardoc.type === 'record') {
    //   await file.delete(join(state.cwd, hardoc.path));

    //   return {
    //     data: {
    //       deleteFile: await doc.removeFromManifest(state.cwd, hardoc.fileName)
    //     }
    //   };
    // }
    await doc.removeFromManifest(state.cwd, hardoc.fileName);
    return {
      data: {
        deleteFile: file.delete(join(state.cwd, hardoc.path))
      }
    };
  },

  async loadSchema() {
    return {
      data: {
        loadSchema: await doc.loadSchema()
      }
    };
  },

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
