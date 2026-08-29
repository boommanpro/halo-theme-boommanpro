const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const homedir = __dirname;
const themeYaml = fs.readFileSync(path.join(homedir, 'theme.yaml'), 'utf8');
const versionMatch = themeYaml.match(/version:\s*(\S+)/);
const version = versionMatch ? versionMatch[1] : 'dev';

const outputName = `halo-theme-boommanpro-${version}.zip`;
const output = fs.createWriteStream(path.join(homedir, outputName));

const archive = archiver('zip', { zlib: { level: 9 } });

archive.on('error', (err) => {
  throw err;
});

output.on('close', () => {
  console.log(`
     --------- --------- 压缩完毕 --------- ---------
        ${path.join(homedir, outputName)} - ${(archive.pointer() / 1024 / 1024).toFixed(2)}MB
     --------- ------------------------------ ---------
     `);
});

archive.pipe(output);
archive.directory('templates/', 'templates');
archive.file('settings.yaml', { name: 'settings.yaml' });
archive.file('annotation-setting.yaml', { name: 'annotation-setting.yaml' });
archive.file('theme.yaml', { name: 'theme.yaml' });
archive.finalize();
