// eslint-disable-next-line no-unused-vars
import app from 'electron';

// const dialog = app.remote.dialog;
// const rendWin = app.remote.getCurrentWindow();

export const getFolderPath = () => {
  return new Promise(() => {
    console.log({
      env: process.env
      // app
    });

    // if (process.env.ORIGINAL_XDG_CURRENT_DESKTOP !== null) {
    //   dialog
    //     .showOpenDialog(rendWin, {
    //       message: 'Select folder to open: ',
    //       properties: [
    //         'createDirectory',
    //         'openDirectory',
    //         'showOverwriteConfirmation'
    //       ]
    //     })
    //     .then((file) => {
    //       console.log(file);
    //       resolve(true);
    //     })

    //     .catch((err) => {
    //       reject(err);

    //     });
    // }
  });
};