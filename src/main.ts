import * as core from '@actions/core'
import {slugref, slug, slugurl, slugurlref, shortsha} from './slug'

/**
 * Inputs environments variables keys from Github actions job
 * see https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
 */
const GITHUB_REPOSITORY = 'GITHUB_REPOSITORY'
const GITHUB_REF = 'GITHUB_REF'
const GITHUB_HEAD_REF = 'GITHUB_HEAD_REF'
const GITHUB_BASE_REF = 'GITHUB_BASE_REF'
const GITHUB_SHA = 'GITHUB_SHA'
const GITHUB_EVENT_PATH = 'GITHUB_EVENT_PATH'

/**
 * Slugged outputs environments variables keys
 */
const GITHUB_REPOSITORY_SLUG = 'GITHUB_REPOSITORY_SLUG'
const GITHUB_REPOSITORY_SLUG_URL = 'GITHUB_REPOSITORY_SLUG_URL'
const GITHUB_REF_SLUG = 'GITHUB_REF_SLUG'
const GITHUB_HEAD_REF_SLUG = 'GITHUB_HEAD_REF_SLUG'
const GITHUB_BASE_REF_SLUG = 'GITHUB_BASE_REF_SLUG'
const GITHUB_REF_SLUG_URL = 'GITHUB_REF_SLUG_URL'
const GITHUB_HEAD_REF_SLUG_URL = 'GITHUB_HEAD_REF_SLUG_URL'
const GITHUB_BASE_REF_SLUG_URL = 'GITHUB_BASE_REF_SLUG_URL'
const GITHUB_SHA_SHORT = 'GITHUB_SHA_SHORT'
const GITHUB_EVENT_REF_SLUG = 'GITHUB_EVENT_REF_SLUG'
const GITHUB_EVENT_REF_SLUG_URL = 'GITHUB_EVENT_REF_SLUG_URL'

async function run(): Promise<void> {
  try {
    const eventPath = process.env[GITHUB_EVENT_PATH]
    if (eventPath) {
      const eventData = await import(eventPath)
      if (eventData.hasOwnProperty('ref')) {
        core.exportVariable(GITHUB_EVENT_REF_SLUG, slugref(eventData.ref))
        core.exportVariable(
          GITHUB_EVENT_REF_SLUG_URL,
          slugurlref(eventData.ref)
        )
      }
    }

    exportSlug(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG)

    exportSlugUrl(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG_URL)

    exportSlugRef(GITHUB_REF, GITHUB_REF_SLUG)
    exportSlugRef(GITHUB_HEAD_REF, GITHUB_HEAD_REF_SLUG)
    exportSlugRef(GITHUB_BASE_REF, GITHUB_BASE_REF_SLUG)

    exportSlugUrlRef(GITHUB_REF, GITHUB_REF_SLUG_URL)
    exportSlugUrlRef(GITHUB_HEAD_REF, GITHUB_HEAD_REF_SLUG_URL)
    exportSlugUrlRef(GITHUB_BASE_REF, GITHUB_BASE_REF_SLUG_URL)

    exportShortSha(GITHUB_SHA, GITHUB_SHA_SHORT)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function exportSlug(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slug(envVar))
  }
}

function exportSlugRef(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slugref(envVar))
  }
}

function exportSlugUrl(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slugurl(envVar))
  }
}

function exportSlugUrlRef(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slugurlref(envVar))
  }
}

function exportShortSha(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, shortsha(envVar))
  }
}

run()
