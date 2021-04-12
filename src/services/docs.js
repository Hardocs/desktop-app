import { cwd, file, project } from 'hardocs-fs';

export default {
  getCWD() {
    return {
      data: {
        cwd: cwd.get()
      }
    };
  },
  async setCWD(path) {
    return {
      data: {
        cwd: await cwd.set(path)
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

  async writeFile(fileMetadata) {
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
  deleteFile(path) {
    return {
      data: {
        deleteFile: file.delete({ filePath: path })
      }
    };
  }
};
