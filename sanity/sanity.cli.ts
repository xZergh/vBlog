import {defineCliConfig} from 'sanity/cli'
import {getRequiredEnv} from './utils/env'

const projectId = getRequiredEnv('SANITY_STUDIO_PROJECT_ID')
const dataset = getRequiredEnv('SANITY_STUDIO_DATASET')

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  studioHost: 'aqa-ninja-studio',
})
