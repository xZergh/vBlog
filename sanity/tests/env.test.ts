import {describe, expect, it, vi} from 'vitest'
import {getRequiredEnv} from '../utils/env'

describe('getRequiredEnv', () => {
  it('returns value when env var exists', () => {
    vi.stubEnv('SANITY_STUDIO_PROJECT_ID', 'proj123')
    expect(getRequiredEnv('SANITY_STUDIO_PROJECT_ID')).toBe('proj123')
  })

  it('throws when env var is missing', () => {
    vi.unstubAllEnvs()
    expect(() => getRequiredEnv('SANITY_STUDIO_PROJECT_ID')).toThrow(
      'Missing required environment variable: SANITY_STUDIO_PROJECT_ID',
    )
  })

  it('trims whitespace for required studio env vars', () => {
    vi.stubEnv('SANITY_STUDIO_DATASET', ' production\n')
    expect(getRequiredEnv('SANITY_STUDIO_DATASET')).toBe('production')
  })

  it('reads generic env names as fallback', () => {
    vi.stubEnv('CUSTOM_ENV_NAME', 'value123')
    expect(getRequiredEnv('CUSTOM_ENV_NAME')).toBe('value123')
  })
})
