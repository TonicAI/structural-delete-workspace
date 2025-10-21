const core = require('@actions/core');
const https = require('https');

async function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: body
        });
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  try {
    const apiHost = core.getInput('structural-url');
    const apiKey = core.getInput('structural-api-key');
    const workspaceId = core.getInput('workspace-id');

    if (!workspaceId) {
      throw new Error('Workspace-id must be provided');
    }

    const url = new URL(`/api/workspace/${encodeURIComponent(workspaceId)}`, apiHost);
    const version = require('./package.json').version;

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'DELETE',
      headers: {
        'Authorization': `apikey ${apiKey}`,
        'User-Agent': 'Tonic-Github-Action',
        'X-GitHub-Action': 'copy-workspace',
        'X-GitHub-Action-Version': version
      }
    };

    core.info(`Deleting workspace with workspace ID: ${workspaceId}`);

    const response = await makeRequest(options);
    
    if (response.statusCode >= 400 && response.statusCode !== 404) {
      throw new Error(`HTTP ${response.statusCode}: ${response.body}`);
    }
    
    if (response.statusCode === 404) {
      core.info(`Workspace ${workspaceId} not found (already deleted)`);
    } else {
      core.info(`Workspace ${workspaceId} deleted successfully`);
    }
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();