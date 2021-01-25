import * as core from '@actions/core'
import {slugref, slug, slugurl, slugurlref} from './slug'
import {shortsha} from './short'
import {get_first_part, get_second_part} from './partial'

const SEPARATOR = '/'

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
 * Partial outputs environments variables keys
 */
const GITHUB_REPOSITORY_OWNER_PART = 'GITHUB_REPOSITORY_OWNER_PART'
const GITHUB_REPOSITORY_NAME_PART = 'GITHUB_REPOSITORY_NAME_PART'

/**
 * Slugged outputs environments variables keys
 */
const GITHUB_REPOSITORY_SLUG = 'GITHUB_REPOSITORY_SLUG'
const GITHUB_REPOSITORY_OWNER_PART_SLUG = 'GITHUB_REPOSITORY_OWNER_PART_SLUG'
const GITHUB_REPOSITORY_NAME_PART_SLUG = 'GITHUB_REPOSITORY_NAME_PART_SLUG'
const GITHUB_REF_SLUG = 'GITHUB_REF_SLUG'
const GITHUB_HEAD_REF_SLUG = 'GITHUB_HEAD_REF_SLUG'
const GITHUB_BASE_REF_SLUG = 'GITHUB_BASE_REF_SLUG'
const GITHUB_EVENT_REF_SLUG = 'GITHUB_EVENT_REF_SLUG'

/**
 * URL-Slugged outputs environments variables keys
 */
const GITHUB_REPOSITORY_SLUG_URL = 'GITHUB_REPOSITORY_SLUG_URL'
const GITHUB_REPOSITORY_OWNER_PART_SLUG_URL =
  'GITHUB_REPOSITORY_OWNER_PART_SLUG_URL'
const GITHUB_REPOSITORY_NAME_PART_SLUG_URL =
  'GITHUB_REPOSITORY_NAME_PART_SLUG_URL'
const GITHUB_REF_SLUG_URL = 'GITHUB_REF_SLUG_URL'
const GITHUB_HEAD_REF_SLUG_URL = 'GITHUB_HEAD_REF_SLUG_URL'
const GITHUB_BASE_REF_SLUG_URL = 'GITHUB_BASE_REF_SLUG_URL'
const GITHUB_EVENT_REF_SLUG_URL = 'GITHUB_EVENT_REF_SLUG_URL'

/**
 * Shorted outputs environments variables keys
 */
const GITHUB_SHA_SHORT = 'GITHUB_SHA_SHORT'
const GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT =
  'GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT'

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
      } else if (eventData.hasOwnProperty('pull_request')) {
        core.exportVariable(
          GITHUB_EVENT_PULL_REQUEST_HEAD_SHA_SHORT,
          shortsha(eventData.pull_request.head.sha)
        )
      }
    }

    exportFirstPart(GITHUB_REPOSITORY, SEPARATOR, GITHUB_REPOSITORY_OWNER_PART)
    exportSecondPart(GITHUB_REPOSITORY, SEPARATOR, GITHUB_REPOSITORY_NAME_PART)

    exportSlug(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG)
    exportFirstPartSlug(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_OWNER_PART_SLUG
    )
    exportSecondPartSlug(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_NAME_PART_SLUG
    )

    exportSlugUrl(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG_URL)
    exportFirstPartSlugUrl(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_OWNER_PART_SLUG_URL
    )
    exportSecondPartSlugUrl(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_NAME_PART_SLUG_URL
    )

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

function exportFirstPart(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, get_first_part(envVar, separator))
  }
}

function exportSecondPart(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, get_second_part(envVar, separator))
  }
}

function exportSlug(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slug(envVar))
  }
}

function exportFirstPartSlug(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    const value = get_first_part(envVar, separator)
    core.exportVariable(outputKey, slug(value))
  }
}

function exportSecondPartSlug(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    const value = get_second_part(envVar, separator)
    core.exportVariable(outputKey, slug(value))
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

function exportFirstPartSlugUrl(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    const value = get_first_part(envVar, separator)
    core.exportVariable(outputKey, slugurl(value))
  }
}

function exportSecondPartSlugUrl(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    const value = get_second_part(envVar, separator)
    core.exportVariable(outputKey, slugurl(value))
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
