import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destination = process.argv[2];
if (!destination) {
  throw new Error("Pass the nginx config path.");
}

const catalog = JSON.parse(readFileSync(path.join(root, "lib", "utility", "utilities.json"), "utf8"));
const locations = catalog.utilities
  .filter((utility) => utility.release)
  .map((utility) => {
    if (!/^[a-z0-9-]+$/.test(utility.id)) {
      throw new Error(`Utility id ${utility.id} cannot be used in an nginx location.`);
    }
    return `
  location /${utility.id}/ {
    alias /srv/utils/utilities/${utility.id}/;
  }`;
  })
  .join("\n");

const config = `server {
  listen 80;
  server_name _;
  root /srv/utils/src/out;
  include /etc/nginx/mime.types;
  location / {
    try_files $uri $uri/ =404;
  }
${locations}
}
`;

writeFileSync(destination, config);
console.log(`nginx: ${destination}`);
