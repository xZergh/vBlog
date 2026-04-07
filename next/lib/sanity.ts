import { createClient } from '@sanity/client';

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET_NAME ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production';

const missingProjectIdError =
  'Missing Sanity project ID. Set SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID.';
if (!projectId) {
  throw new Error(missingProjectIdError);
}

const client = createClient({
  dataset,
  projectId,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03',
});

export default client;
