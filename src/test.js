const { cwd } = require('hardocs-fs');
const path = require('path');
// export const chooseFolderForUse = cwd.get();

console.log({
  cwd: cwd.get(),
  base: path.dirname('/home/divine/Desktop/')
});
