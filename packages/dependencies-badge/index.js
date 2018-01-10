#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function readdir(directoryPath) {
  return new Promise(resolve => {
    fs.readdir(directoryPath, (err, items) => {
      if (!items) {
        resolve([]);
      }
      resolve(items);
    });
  });
}

async function countDependencies(directoryPath) {
  let count = 0;
  let tree = {};
  const items = await readdir(directoryPath);
  for (const item of items) {
    if (item === '.bin') {
      continue;
    }
    if (item.startsWith('@')) {
      const [subcount, subtree] = await countDependencies(
        path.join(directoryPath, item)
      );
      tree[item] = subtree;
      count += subcount;
    } else {
      count += 1;
      const [subcount, subtree] = await countDependencies(
        path.join(directoryPath, item, 'node_modules')
      );
      tree[item] = subtree;
      count += subcount;
    }
  }
  return [count, tree];
}

function formatNumber(number) {
  const dimensions = {
    M: 1000000,
    k: 1000,
  };
  for (const suffix in dimensions) {
    const divisor = dimensions[suffix];
    if (number >= divisor) {
      number = parseInt(number / parseInt(divisor / 10));
      number = `${number / 10}${suffix}`;
      break;
    }
  }
  return number;
}

function getColor(number) {
  if (number === 0) {
    return 'green';
  }
  return 'blue';
}

function formatTree(tree, deepth = 0, scope) {
  let formattedTree = '';
  for (const item in tree) {
    let formattedName;
    if (!item.startsWith('@')) {
      formattedName = `[${item}](https://www.npmjs.com/package/${scope ? `${scope}/` : ''}${item})`;
    } else {
      formattedName = item;
    }
    formattedTree += `${'  '.repeat(deepth)}- ${formattedName}\n`;
    const subtree = tree[item];
    formattedTree += formatTree(
      subtree,
      deepth + 1,
      item.startsWith('@') ? item : undefined
    );
  }
  return formattedTree;
}

(async () => {
  let [count, tree] = await countDependencies(
    path.join(process.cwd(), 'node_modules')
  );
  count = formatNumber(count);
  tree = formatTree(tree);
  fs.writeFileSync(
    path.join(process.cwd(), 'DEPENDENCIES.md'),
    `# Dependencies: ${count}\n${tree ? `\n${tree}` : ''}`
  );
  let readme;
  try {
    readme = fs.readFileSync(path.join(process.cwd(), 'README.md'));
  } catch (e) {}
  const dependencies = `[![dependencies | ${count}](https://img.shields.io/badge/dependencies-${count}-${getColor(count)}.svg)](DEPENDENCIES.md)`;
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
