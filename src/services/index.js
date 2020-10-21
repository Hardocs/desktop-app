import { project, cwd, file } from 'hardocs-fs';

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
    const data = {
      createProject: await project.create(projectMetadata)
    };

    return {
      data
    };
  },

  /**
   * @param {Object} projectMetadata
   */
  async createProjectFromExisting(projectMetadata) {
    return {
      data: {
        createProjectFromExisting: await project.createFromExisting(
          projectMetadata
        )
      }
    };
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
