import electron from 'electron';

const { dialog, getCurrentWindow } = electron.remote;
const rendWin = getCurrentWindow();

const chooseFolderForUse = (
  typesName = 'Choose a Folder',
  properties = ['openDirectory']
) => {
  // as other calls, this is a Promise, so you use via .then and .catch as always
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog(rendWin, {
        filters: [{ name: typesName, extensions: ['*'] }],
        properties: properties
      })
      .then((fileInfo) => {
        if (!fileInfo.canceled) {
          // the folder is always the first of the filePaths
          const folderPath = fileInfo.filePaths[0];
          resolve(folderPath);
        } else {
          reject('(Cancelled...)');
        }
      })
      .catch((err) => {
        reject('chooseFolderForUse: ' + err.toString());
      });
  });
};

export default {
  chooseFolderForUse
};
