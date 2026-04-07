export function getRequiredEnv(name: string): string {
  // Use static key access so client bundles can inline these values.
  const rawValue =
    name === 'SANITY_STUDIO_PROJECT_ID'
      ? process.env.SANITY_STUDIO_PROJECT_ID
      : name === 'SANITY_STUDIO_DATASET'
        ? process.env.SANITY_STUDIO_DATASET
        : name === 'SANITY_STUDIO_API_VERSION'
          ? process.env.SANITY_STUDIO_API_VERSION
          : process.env[name]
  const value = rawValue?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}
