import { join, sep } from 'path';

export function initCWD() {
  const INIT_CWD = process.env.INIT_CWD.split(sep);
  let BASE_PATH = __dirname;
  if (INIT_CWD) {
    const PROJECT_NAME = INIT_CWD[INIT_CWD.length - 1];

    if (INIT_CWD[INIT_CWD.length - 2] === PROJECT_NAME) {
      INIT_CWD.pop();
      BASE_PATH = join(INIT_CWD.join(sep), 'src', 'store', '__tests__');
      console.log({ BASE_PATH1: BASE_PATH });
    }
  }

  return BASE_PATH;
}
