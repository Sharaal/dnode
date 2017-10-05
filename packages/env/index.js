const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(process.cwd(), '.env.example'))) {
  require('dotenv-safe').config();
} else if (fs.existsSync(path.join(process.cwd(), '.env'))) {
  require('dotenv').config();
}
