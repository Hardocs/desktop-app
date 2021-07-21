import path from 'path';

export function initCWD() {
  const INIT_CWD = process.env.INIT_CWD.split(path.sep);
  let BASE_PATH = __dirname;
  if (INIT_CWD) {
    const PROJECT_NAME = INIT_CWD[INIT_CWD.length - 1];

    if (INIT_CWD[INIT_CWD.length - 2] === PROJECT_NAME) {
      INIT_CWD.pop();
      BASE_PATH = INIT_CWD.join(path.sep);
      console.log({ BASE_PATH1: BASE_PATH });
    }
  }

  return BASE_PATH;
}
