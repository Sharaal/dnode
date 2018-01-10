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
  const items = await readdir(directoryPath);
  for (const item of items) {
    if (item === '.bin') {
      continue;
    }
    if (item.startsWith('@')) {
      count += await countDependencies(path.join(directoryPath, item));
      continue;
    }
    count += 1;
    count += await countDependencies(path.join(directoryPath, item, 'node_modules'));
  }
  return count;
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

(async () => {
  const count = formatNumber(await countDependencies(path.join(process.cwd(), 'node_modules')));
  let readme;
  try {
    readme = fs.readFileSync(path.join(process.cwd(), 'README.md'));
  } catch (e) {}
  const dependencies = `![dependencies | ${count}](https://img.shields.io/badge/dependencies-${count}-${getColor(count)}.svg)`;
  if (readme) {
    readme = readme.toString();
    const regex = /\!\[dependencies \| .*?\]\(https:\/\/img\.shields\.io\/badge\/dependencies-.*?-.*?\.svg\)/;
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
