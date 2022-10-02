/* eslint-disable global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */

export const gitImportRepos: GithubRepo[] = [
  { url: 'https://github.com/sclorg/dancer-ex', folder: 'dancer-ex' },
  { url: 'https://github.com/sclorg/cakephp-ex', folder: 'cakephp-ex' },
  { url: 'https://github.com/sclorg/golang-ex', folder: 'golang-ex' },
  { url: 'https://github.com/sclorg/ruby-ex', folder: 'ruby-ex' },
  { url: 'https://github.com/sclorg/django-ex', folder: 'django-ex' },
  { url: 'https://github.com/spring-projects/spring-boot', folder: 'spring-boot' },
  { url: 'https://github.com/sclorg/nodejs-ex', folder: 'nodejs-ex' },
  { url: 'https://github.com/redhat-developer/s2i-dotnetcore-ex', folder: 's2i-dotnetcore-ex' },
  { url: 'https://github.com/nodeshift-starters/devfile-sample', folder: 'devfile-sample' },
  {
    url: 'https://github.com/rohitkrai03/flask-dockerfile-example',
    folder: 'flask-dockerfile-example',
  },
];

interface GithubRepo {
  url: string;
  folder: string;
}

export function getResponseMocks(repo: GithubRepo) {
  const repoJson = require(`./${repo.folder}/repo.json`);
  const contentsJson = require(`./${repo.folder}/contents.json`);

  let packageJson = null;
  let devFileResources = null;
  try {
    packageJson = require(`./${repo.folder}/package.json`);
  } catch (err) {
    // nothing, the file does not exist
  }
  try {
    devFileResources = require(`./${repo.folder}/devFileResources.json`);
  } catch (err) {
    // nothing, the file does not exist
  }
  return {
    repoResponse: repoJson,
    contentsResponse: contentsJson,
    packageResponse: packageJson,
    devFileResources,
  };
}
