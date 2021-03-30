import { habitatLocal } from '@hardocs-project/habitat-client';
// import { project } from 'hardocs-fs';

export default {
  /**
   *
   * @returns a selected JSON schema standard.
   */
  loadSchema: async () => {
    try {
      const data = await habitatLocal.selectContentFromFolder(
        ['json'],
        'Json file'
      );

      const response = data.content;
      // await project.updateSchema({content: response}) // TODO: Implement this in the hardocs-fs module
      return response;
    } catch (err) {
      console.error('initProject:err: ' + err);
    }
  }
};
