import axios from 'axios';
import prompts from 'prompts';
import * as fs from 'fs/promises';
import * as path from 'path';
import JSZip from 'jszip';
import FormData from 'form-data';
import { execSync } from 'child_process';

const SUBMISSION_DIR = 'submission';
const ASSESSMENT_TYPE = 'feature-development';
const ASSESSMENT_VERSION = 'v3';
const ASSESSMENT_BRANCH = `rwa/${ASSESSMENT_TYPE}-${ASSESSMENT_VERSION}`;
const API_URL = 'iyuja327ulc6hq3xsypufut7bh0lygdq.ynzoqn-hey.hf-rnfg-1.ba.njf';

function decode(s: string): string {
  const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  const index = (x: string) => input.indexOf(x);
  const translate = (x: string) => (index(x) > -1 ? output[index(x)] : x);
  return s.split('').map(translate).join('');
}

function execCommand(command: string): string {
  try {
    return execSync(command).toString().trim();
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    process.exit(1);
  }
}

async function getInputs(): Promise<{ name: string; email: string }> {
  const gitConfigName = execCommand('git config user.name');
  const gitConfigEmail = execCommand('git config user.email');

  const response = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Enter your name:',
      initial: gitConfigName,
    },
    {
      type: 'text',
      name: 'email',
      message: 'Enter your email:',
      initial: gitConfigEmail,
    },
  ]);

  return response;
}

async function countFilesByExtension(extensions = ['.json']): Promise<number> {
  try {
    return (await fs.readdir(SUBMISSION_DIR))
      .filter((file) => extensions.includes(path.extname(file).toLowerCase()))
      .map((file) => path.join(SUBMISSION_DIR, file)).length;
  } catch (error) {
    return 0;
  }
}

const REPO_GIT_URL = 'https://github.com/trilogy-group/ws-eng-conduit-ai-assessment.git'

async function createGitDiff(): Promise<string> {
  execCommand('git add --all');
  execCommand(`git commit --allow-empty -am "chore(conduit): Generates patch."`);
  const diffOutput = execCommand(
    `git diff origin/${ASSESSMENT_BRANCH}...HEAD -- . ":!*.patch" ":!yarn.lock" ":!package-lock.json" ":!**/tsconfig*.json"`,
  );
  const diffPath = path.join(SUBMISSION_DIR, 'submission.patch');
  if (!diffOutput?.trim()) {
    console.log("No code changes were detected. This may mean that you forked or created your own copy of the repository.");
    console.log(`If so, reset your git origin to '${REPO_GIT_URL}'.`);
    console.log(`You can do so by running 'git remote set-url origin ${REPO_GIT_URL}'.`);
    console.log("Afterward, please run the submit script again to properly detect your code changes.");
    process.exit(0);
  }
  await fs.writeFile(diffPath, diffOutput);
  return diffPath;
}

async function confirmSubmission({ name, email, diffPath }: { name: string; email: string; diffPath: string }) {
  console.log('');
  console.log('Submission Contents:');
  console.log(` Name:        ${name}`);
  console.log(` Email:       ${email}`);
  console.log(` Code:        ${diffPath} (size = ${(await fs.stat(diffPath)).size})`);
  console.log(` Chats:       ${await countFilesByExtension(['.json'])} files`);
  console.log(` Screenshots: ${await countFilesByExtension(['.jpg', '.jpeg', '.png', '.gif', '.bmp'])} files`);
  console.log('');
  console.log('Please ensure that all your changes are reflected in the patch file.');

  const confirm = await prompts({
    type: 'confirm',
    name: 'value',
    message: 'Do you want to proceed with your submission?',
    initial: true,
  });

  if (!confirm.value) {
    console.log('Submission canceled. You can perform the submission later.');
    process.exit(0);
  }
}

async function createZip(): Promise<Buffer> {
  console.log('');
  const files = await fs.readdir(SUBMISSION_DIR);
  const zip = new JSZip();
  for (const file of files) {
    const filePath = path.join(SUBMISSION_DIR, file);
    const fileContent = await fs.readFile(filePath);
    console.log(`Adding "${file}" (size = ${fileContent.byteLength}) to submission...`);
    zip.file(file, fileContent);
  }
  const result = await zip.generateAsync({ type: 'nodebuffer' });
  console.log(`Submission archive size: ${result.byteLength} bytes`);
  console.log('');
  return result;
}

async function handleSubmission() {
  const { name, email } = await getInputs();
  const diffPath = await createGitDiff();
  await confirmSubmission({ name, email, diffPath });
  const zip = await createZip();

  const apiUrl = `https://${decode(API_URL)}/`;
  const jsonBody = {
    name,
    email,
    size: zip.byteLength,
    type: ASSESSMENT_TYPE,
  };

  try {
    const { data } = await axios.post(apiUrl, jsonBody, { headers: { 'Content-Type': 'application/json' } });

    const form = new FormData();
    Object.entries(data.upload.fields || {}).forEach(([key, value]) => form.append(key, value));
    form.append('file', zip);
    await axios.post(data.upload.url, form, { headers: form.getHeaders() });

    console.log('Submission successful, ID:', data.submissionId);
    console.log(
      'Please copy-paste this ID into the Crossover assessment page. You may resubmit your work as many times as you need, but only the submission with the ID recorded into the Crossover assessment page will be considered.',
    );
  } catch (error) {
    console.error('Failed to upload submission. If you cannot resolve the issue, please contact support.', error);
    process.exit(1);
  }
}

handleSubmission().catch(console.error);
