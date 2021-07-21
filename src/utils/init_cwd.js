import path from 'path';

export function initCWD() {
  const INIT_CWD = process.env.INIT_CWD.split(path.sep());
  if (INIT_CWD) {
    const PROJECT_NAME = INIT_CWD[INIT_CWD.length - 1];

    if (INIT_CWD[INIT_CWD.length - 2] === PROJECT_NAME) {
      INIT_CWD.pop();
      process.eng.INIT_CWD = INIT_CWD.join(path.sep());
    }
  }
}
