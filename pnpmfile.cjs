const GIT_REPO = 'github:apostrophecms/apostrophe';
const REF_ENV_VAR = 'APOS_MONOREPO_REF';
const DEFAULT_REF = process.env[REF_ENV_VAR] || 'main';

function workspaceSource(name) {
  const segment = name.split('/').pop();
  return `${GIT_REPO}#${DEFAULT_REF}&path:packages/${segment}`;
}

function rewriteWorkspaceSpecs(map) {
  if (!map) {
    return;
  }

  for (const [ dep, spec ] of Object.entries(map)) {
    if (typeof spec === 'string' && spec.startsWith('workspace:')) {
      map[dep] = workspaceSource(dep);
    }
  }
}

module.exports = {
  hooks: {
    readPackage(pkg) {
      rewriteWorkspaceSpecs(pkg.dependencies);
      rewriteWorkspaceSpecs(pkg.optionalDependencies);
      rewriteWorkspaceSpecs(pkg.devDependencies);
      return pkg;
    }
  }
};
