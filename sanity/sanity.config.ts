import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {codeInput} from '@sanity/code-input'
import {getRequiredEnv} from './utils/env'

const projectId = getRequiredEnv('SANITY_STUDIO_PROJECT_ID')
const dataset = getRequiredEnv('SANITY_STUDIO_DATASET')

export default defineConfig({
  name: 'default',
  title: 'Blog Me - Sanity Studio',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },

  api: {
    projectId,
    dataset,
    apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2024-01-01',
  },
})
