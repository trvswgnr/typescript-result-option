import * as fs from 'fs';
import * as path from 'path';

const packageJsonContents = fs.readFileSync(path.join(__dirname, '../', 'package.json'), 'utf8');

const packageJson = JSON.parse(packageJsonContents) as {
    exports: Record<string, any>;
};

const pkgJsonExports = Object.keys(packageJson.exports).filter((entrypoint) => {
    return entrypoint !== '.'; // ignore the root entrypoint
});

const entrypointFiles = fs.readdirSync(path.join(__dirname, '../src')).map((file) => {
    return file.replace('.ts', '');
});

for (const entrypointFile of entrypointFiles) {
    if (!pkgJsonExports.includes(`./${entrypointFile}`)) {
        console.error(`Missing export file in package.json for ./src/${entrypointFile}.ts`);

        process.exit(1);
    }
}
