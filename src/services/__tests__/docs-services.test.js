import { file, folder } from 'hardocs-fs';
import path from 'path';
import { DocsServices } from '..';

const projectName = 'test project';
const mocksDir = path.join(__dirname, '__mocks__');
const projectPath = path.join(mocksDir, projectName);
const docsDir = 'docs';

test('Should create a project', async () => {
  const {
    data: { createProject }
  } = await DocsServices.createNewProject({
    name: projectName,
    docsDir,
    path: mocksDir
  });

  // Ensure that the project folder was created
  expect(folder.isDirectory(createProject.path)).toBeTruthy();

  // Ensure that the manifest was created
  expect(
    file.exists(path.join(createProject.path, '.hardocs', 'hardocs.json'))
  ).toBeTruthy();

  // Ensure that the project docs directory was created
  expect(
    folder.isDirectory(path.join(createProject.path, createProject.docsDir))
  ).toBeTruthy();
});

test('should open a project', async () => {
  const {
    data: { openProject }
  } = await DocsServices.getProject(projectPath);

  expect(openProject).not.toBeUndefined();
  expect(openProject.name).toStrictEqual(projectName);
  expect(openProject.path).toStrictEqual(projectPath);
  expect(openProject.docsDir).toStrictEqual(docsDir);
  // expect(openProject.hardocs).toStrictEqual([]);
});

test('should save a doc file', async () => {
  const {
    data: { writeToFile }
  } = await DocsServices.writeFile(projectPath, {
    path: path.join(docsDir, 'test.html'),
    content: '<h1>Welcome to hardocs</h1>'
  });

  expect(writeToFile).toBeTruthy();
});

test('should delete a doc', async () => {
  const {
    data: { deleteFile }
  } = await DocsServices.deleteFile(
    {
      fileName: 'test.html',
      path: path.join(docsDir, 'test.html')
    },
    {
      cwd: projectPath
    }
  );

  expect(deleteFile).toBeTruthy();
});
