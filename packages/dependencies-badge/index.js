#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getTree(directoryPath) {
  const tree = {};
  const packagePath = path.join(directoryPath, 'package.json');
  if (!fs.existsSync(packagePath)) {
    return tree;
  }
  const dependencies = require(packagePath).dependencies || {};
  for (let dependency in dependencies) {
    let relativePath;
    if (dependency.startsWith('@')) {
      let [scope, name] = dependency.split('/');
      relativePath = path.join(scope, name);
    } else {
      relativePath = dependency;
    }
    let subDirectoryPath = directoryPath;
    while (!tree[dependency]) {
      const absolutePath = path.join(
        subDirectoryPath,
        'node_modules',
        relativePath
      );
      if (fs.existsSync(absolutePath)) {
        tree[dependency] = getTree(absolutePath);
      } else {
        if (subDirectoryPath === '/') {
          break;
        }
        subDirectoryPath = path.resolve(path.join(subDirectoryPath, '..'));
      }
    }
    tree[dependency] = tree[dependency] || {};
  }
  return tree;
}

function formatTree(tree, deepth = 0) {
  let formattedTree = '';
  for (const dependency in tree) {
    formattedTree += `${'  '.repeat(deepth)}- [${dependency}](https://www.npmjs.com/package/${dependency})\n`;
    formattedTree += formatTree(tree[dependency], deepth + 1);
  }
  return formattedTree;
}

function directCountTree(tree) {
  let count = 0;
  for (const dependency in tree) {
    count += 1;
  }
  return count;
}

function countTree(tree, set) {
  if (!set) {
    set = new Set();
  }
  for (const dependency in tree) {
    set.add(dependency);
    countTree(tree[dependency], set);
  }
  return set.size;
}

function formatCount(count) {
  const dimensions = {
    M: 1000000,
    k: 1000,
  };
  for (const suffix in dimensions) {
    const divisor = dimensions[suffix];
    if (count >= divisor) {
      count = parseInt(count / parseInt(divisor / 10));
      count = `${count / 10}${suffix}`;
      break;
    }
  }
  return count;
}

function getColor(count) {
  if (count === 0) {
    return 'green';
  }
  return 'blue';
}

(async () => {
  const tree = getTree(process.cwd());
  const directCount = directCountTree(tree);
  const formattedDirectCount = formatCount(directCount);
  const count = countTree(tree);
  const formattedCount = formatCount(count);

  fs.writeFileSync(
    path.join(process.cwd(), 'DEPENDENCIES.md'),
    `# Dependencies\n\nDirectly: ${formattedDirectCount}\nIndirectly: ${formattedCount}\n${count ? `\n${formatTree(tree)}` : ''}`
  );

  let readme;
  try {
    readme = fs.readFileSync(path.join(process.cwd(), 'README.md'));
  } catch (e) {}
  const dependencies = `[![dependencies | ${formattedDirectCount} | ${formattedCount}](https://img.shields.io/badge/dependencies-${formattedDirectCount}%20|%20${formattedCount}-${getColor(count)}.svg)](DEPENDENCIES.md)`;
  if (readme) {
    readme = readme.toString();
    const regex = /\[\!\[dependencies \| .*?\]\(https:\/\/img\.shields\.io\/badge\/dependencies-.*?-.*?\.svg\)\]\(DEPENDENCIES.md\)/;
    if (regex.test(readme)) {
      readme = readme.replace(regex, dependencies);
    } else {
      readme = `${dependencies}\n\n${readme}`;
    }
  } else {
    readme = `${dependencies}\n`;
  }
  fs.writeFileSync(path.join(process.cwd(), 'README.md'), readme);
})();
