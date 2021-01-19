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
const SLUG_GITHUB_REPOSITORY = 'SLUG_GITHUB_REPOSITORY'
const SLUG_URL_GITHUB_REPOSITORY = 'SLUG_URL_GITHUB_REPOSITORY'
const SLUG_GITHUB_REF = 'SLUG_GITHUB_REF'
const SLUG_GITHUB_HEAD_REF = 'SLUG_GITHUB_HEAD_REF'
const SLUG_GITHUB_BASE_REF = 'SLUG_GITHUB_BASE_REF'
const SLUG_URL_GITHUB_REF = 'SLUG_URL_GITHUB_REF'
const SLUG_URL_GITHUB_HEAD_REF = 'SLUG_URL_GITHUB_HEAD_REF'
const SLUG_URL_GITHUB_BASE_REF = 'SLUG_URL_GITHUB_BASE_REF'
const SHORT_GITHUB_SHA = 'SHORT_GITHUB_SHA'
const SLUG_GITHUB_EVENT_REF = 'SLUG_GITHUB_EVENT_REF'
const SLUG_URL_GITHUB_EVENT_REF = 'SLUG_URL_GITHUB_EVENT_REF'
const SHORT_GITHUB_EVENT_PULL_REQUEST_HEAD_SHA =
  'SHORT_GITHUB_EVENT_PULL_REQUEST_HEAD_SHA'

async function run(): Promise<void> {
  try {
    const eventPath = process.env[GITHUB_EVENT_PATH]
    if (eventPath) {
      const eventData = await import(eventPath)
      if (eventData.hasOwnProperty('ref')) {
        core.exportVariable(SLUG_GITHUB_EVENT_REF, slugref(eventData.ref))
        core.exportVariable(
          SLUG_URL_GITHUB_EVENT_REF,
          slugurlref(eventData.ref)
        )
      } else if (eventData.hasOwnProperty('pull_request')) {
        core.exportVariable(
          SHORT_GITHUB_EVENT_PULL_REQUEST_HEAD_SHA,
          shortsha(eventData.pull_request.head.sha)
        )
      }
    }

    exportSlug(GITHUB_REPOSITORY, SLUG_GITHUB_REPOSITORY)

    exportSlugUrl(GITHUB_REPOSITORY, SLUG_URL_GITHUB_REPOSITORY)

    exportSlugRef(GITHUB_REF, SLUG_GITHUB_REF)
    exportSlugRef(GITHUB_HEAD_REF, SLUG_GITHUB_HEAD_REF)
    exportSlugRef(GITHUB_BASE_REF, SLUG_GITHUB_BASE_REF)

    exportSlugUrlRef(GITHUB_REF, SLUG_URL_GITHUB_REF)
    exportSlugUrlRef(GITHUB_HEAD_REF, SLUG_URL_GITHUB_HEAD_REF)
    exportSlugUrlRef(GITHUB_BASE_REF, SLUG_URL_GITHUB_BASE_REF)

    exportShortSha(GITHUB_SHA, SHORT_GITHUB_SHA)
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
