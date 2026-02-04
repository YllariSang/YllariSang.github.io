import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function repoNameFromPkg(pkg) {
  if (pkg.repository) {
    const repo = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url || '';
    // examples: git+https://github.com/user/repo.git or https://github.com/user/repo.git
    const m = repo.match(/github.com[:/](.+?)\/(.+?)(?:\.git)?$/);
    if (m) return m[2];
  }
  if (pkg.name) return pkg.name.replace(/^@.*\//, '');
  return null;
}

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

(async () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const repoName = repoNameFromPkg(pkg) || 'your-repo-name';
  const base = `/${repoName}/`;
  console.log('Using base:', base);

  // Run Astro build with ASTRO_BASE set for this child process
  execSync('npx astro build', { stdio: 'inherit', env: { ...process.env, ASTRO_BASE: base } });

  const distDir = path.resolve('dist');
  const docsDir = path.resolve('docs');

  // remove existing docs
  if (fs.existsSync(docsDir)) {
    fs.rmSync(docsDir, { recursive: true, force: true });
  }

  // copy dist -> docs
  if (fs.existsSync(distDir)) {
    copyRecursive(distDir, docsDir);
    console.log('Copied', distDir, '→', docsDir);
  } else {
    console.error('Build output not found at', distDir);
    process.exit(1);
  }

  console.log('\nBuild complete. You can now publish the `docs/` folder via GitHub Pages (Settings → Pages).');
})();
