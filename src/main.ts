import * as core from '@actions/core'
import {
  removeRef,
  slug,
  slug_cs,
  slugref,
  slugref_cs,
  slugurl,
  slugurl_cs,
  slugurlref,
  slugurlref_cs
} from './slug'
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
 * New environments variables keys
 */
const GITHUB_REF_NAME = 'GITHUB_REF_NAME'

/**
 * Slugged outputs environments variables keys
 */
const GITHUB_REPOSITORY_SLUG = 'GITHUB_REPOSITORY_SLUG'
const GITHUB_REPOSITORY_SLUG_CS = 'GITHUB_REPOSITORY_SLUG_CS'
const GITHUB_REPOSITORY_OWNER_PART_SLUG = 'GITHUB_REPOSITORY_OWNER_PART_SLUG'
const GITHUB_REPOSITORY_OWNER_PART_SLUG_CS =
  'GITHUB_REPOSITORY_OWNER_PART_SLUG_CS'
const GITHUB_REPOSITORY_NAME_PART_SLUG = 'GITHUB_REPOSITORY_NAME_PART_SLUG'
const GITHUB_REPOSITORY_NAME_PART_SLUG_CS =
  'GITHUB_REPOSITORY_NAME_PART_SLUG_CS'
const GITHUB_REF_SLUG = 'GITHUB_REF_SLUG'
const GITHUB_REF_SLUG_CS = 'GITHUB_REF_SLUG_CS'
const GITHUB_HEAD_REF_SLUG = 'GITHUB_HEAD_REF_SLUG'
const GITHUB_HEAD_REF_SLUG_CS = 'GITHUB_HEAD_REF_SLUG_CS'
const GITHUB_BASE_REF_SLUG = 'GITHUB_BASE_REF_SLUG'
const GITHUB_BASE_REF_SLUG_CS = 'GITHUB_BASE_REF_SLUG_CS'
const GITHUB_EVENT_REF_SLUG = 'GITHUB_EVENT_REF_SLUG'
const GITHUB_EVENT_REF_SLUG_CS = 'GITHUB_EVENT_REF_SLUG_CS'
const GITHUB_REF_NAME_SLUG = 'GITHUB_REF_NAME_SLUG'
const GITHUB_REF_NAME_SLUG_CS = 'GITHUB_REF_NAME_SLUG_CS'

/**
 * URL-Slugged outputs environments variables keys
 */
const GITHUB_REPOSITORY_SLUG_URL = 'GITHUB_REPOSITORY_SLUG_URL'
const GITHUB_REPOSITORY_SLUG_URL_CS = 'GITHUB_REPOSITORY_SLUG_URL_CS'
const GITHUB_REPOSITORY_OWNER_PART_SLUG_URL =
  'GITHUB_REPOSITORY_OWNER_PART_SLUG_URL'
const GITHUB_REPOSITORY_OWNER_PART_SLUG_URL_CS =
  'GITHUB_REPOSITORY_OWNER_PART_SLUG_URL_CS'
const GITHUB_REPOSITORY_NAME_PART_SLUG_URL =
  'GITHUB_REPOSITORY_NAME_PART_SLUG_URL'
const GITHUB_REPOSITORY_NAME_PART_SLUG_URL_CS =
  'GITHUB_REPOSITORY_NAME_PART_SLUG_URL_CS'
const GITHUB_REF_SLUG_URL = 'GITHUB_REF_SLUG_URL'
const GITHUB_REF_SLUG_URL_CS = 'GITHUB_REF_SLUG_URL_CS'
const GITHUB_HEAD_REF_SLUG_URL = 'GITHUB_HEAD_REF_SLUG_URL'
const GITHUB_HEAD_REF_SLUG_URL_CS = 'GITHUB_HEAD_REF_SLUG_URL_CS'
const GITHUB_BASE_REF_SLUG_URL = 'GITHUB_BASE_REF_SLUG_URL'
const GITHUB_BASE_REF_SLUG_URL_CS = 'GITHUB_BASE_REF_SLUG_URL_CS'
const GITHUB_EVENT_REF_SLUG_URL = 'GITHUB_EVENT_REF_SLUG_URL'
const GITHUB_EVENT_REF_SLUG_URL_CS = 'GITHUB_EVENT_REF_SLUG_URL_CS'
const GITHUB_REF_NAME_SLUG_URL = 'GITHUB_REF_NAME_SLUG_URL'
const GITHUB_REF_NAME_SLUG_URL_CS = 'GITHUB_REF_NAME_SLUG_URL_CS'

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
        core.exportVariable(GITHUB_EVENT_REF_SLUG_CS, slugref_cs(eventData.ref))
        core.exportVariable(
          GITHUB_EVENT_REF_SLUG_URL,
          slugurlref(eventData.ref)
        )
        core.exportVariable(
          GITHUB_EVENT_REF_SLUG_URL_CS,
          slugurlref_cs(eventData.ref)
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
    exportSlugCS(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG_CS)
    exportFirstPartSlug(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_OWNER_PART_SLUG
    )
    exportFirstPartSlugCS(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_OWNER_PART_SLUG_CS
    )
    exportSecondPartSlug(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_NAME_PART_SLUG
    )
    exportSecondPartSlugCS(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_NAME_PART_SLUG_CS
    )

    exportSlugUrl(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG_URL)
    exportSlugUrlCS(GITHUB_REPOSITORY, GITHUB_REPOSITORY_SLUG_URL_CS)
    exportFirstPartSlugUrl(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_OWNER_PART_SLUG_URL
    )
    exportFirstPartSlugUrlCS(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_OWNER_PART_SLUG_URL_CS
    )
    exportSecondPartSlugUrl(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_NAME_PART_SLUG_URL
    )
    exportSecondPartSlugUrlCS(
      GITHUB_REPOSITORY,
      SEPARATOR,
      GITHUB_REPOSITORY_NAME_PART_SLUG_URL_CS
    )

    exportSlugRef(GITHUB_REF, GITHUB_REF_SLUG)
    exportSlugRefCS(GITHUB_REF, GITHUB_REF_SLUG_CS)
    exportSlugRef(GITHUB_HEAD_REF, GITHUB_HEAD_REF_SLUG)
    exportSlugRefCS(GITHUB_HEAD_REF, GITHUB_HEAD_REF_SLUG_CS)
    exportSlugRef(GITHUB_BASE_REF, GITHUB_BASE_REF_SLUG)
    exportSlugRefCS(GITHUB_BASE_REF, GITHUB_BASE_REF_SLUG_CS)

    exportSlugUrlRef(GITHUB_REF, GITHUB_REF_SLUG_URL)
    exportSlugUrlRefCS(GITHUB_REF, GITHUB_REF_SLUG_URL_CS)
    exportSlugUrlRef(GITHUB_HEAD_REF, GITHUB_HEAD_REF_SLUG_URL)
    exportSlugUrlRefCS(GITHUB_HEAD_REF, GITHUB_HEAD_REF_SLUG_URL_CS)
    exportSlugUrlRef(GITHUB_BASE_REF, GITHUB_BASE_REF_SLUG_URL)
    exportSlugUrlRefCS(GITHUB_BASE_REF, GITHUB_BASE_REF_SLUG_URL_CS)

    exportShortSha(GITHUB_SHA, GITHUB_SHA_SHORT)

    exportBranchName()
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

function exportSlugCS(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slug_cs(envVar))
  }
}
function exportSlug(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slug(envVar))
  }
}

function exportFirstPartSlugCS(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    const value = get_first_part(envVar, separator)
    core.exportVariable(outputKey, slug_cs(value))
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

function exportSecondPartSlugCS(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    const value = get_second_part(envVar, separator)
    core.exportVariable(outputKey, slug_cs(value))
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

function exportSlugRefCS(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    exportSlugRefCSValue(envVar, outputKey)
  }
}

function exportSlugRefCSValue(envVar: string, outputKey: string): void {
  core.exportVariable(outputKey, slugref_cs(envVar))
}

function exportSlugRef(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    exportSlugRefValue(envVar, outputKey)
  }
}

function exportSlugRefValue(envVar: string, outputKey: string): void {
  core.exportVariable(outputKey, slugref(envVar))
}

function exportSlugUrlCS(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slugurl_cs(envVar))
  }
}
function exportSlugUrl(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, slugurl(envVar))
  }
}

function exportFirstPartSlugUrlCS(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    const value = get_first_part(envVar, separator)
    core.exportVariable(outputKey, slugurl_cs(value))
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

function exportSecondPartSlugUrlCS(
  inputKey: string,
  separator: string,
  outputKey: string
): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    const value = get_second_part(envVar, separator)
    core.exportVariable(outputKey, slugurl_cs(value))
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

function exportSlugUrlRefCS(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    exportSlugUrlRefCSValue(envVar, outputKey)
  }
}

function exportSlugUrlRefCSValue(envVar: string, outputKey: string): void {
  core.exportVariable(outputKey, slugurlref_cs(envVar))
}

function exportSlugUrlRef(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    exportSlugUrlRefValue(envVar, outputKey)
  }
}

function exportSlugUrlRefValue(envVar: string, outputKey: string): void {
  core.exportVariable(outputKey, slugurlref(envVar))
}

function exportShortSha(inputKey: string, outputKey: string): void {
  const envVar = process.env[inputKey]
  if (envVar) {
    core.exportVariable(outputKey, shortsha(envVar))
  }
}

function exportBranchName(): void {
  //GITHUB_HEAD_REF is only set for pull request events https://docs.github.com/en/actions/reference/environment-variables
  const isPullRequest = !!process.env.GITHUB_HEAD_REF
  let refName
  if (isPullRequest) {
    refName = process.env.GITHUB_HEAD_REF
  } else {
    refName = process.env.GITHUB_REF
  }
  if (refName) {
    core.exportVariable(GITHUB_REF_NAME, removeRef(refName))
    exportSlugRefValue(refName, GITHUB_REF_NAME_SLUG)
    exportSlugRefCSValue(refName, GITHUB_REF_NAME_SLUG_CS)
    exportSlugUrlRefValue(refName, GITHUB_REF_NAME_SLUG_URL)
    exportSlugUrlRefCSValue(refName, GITHUB_REF_NAME_SLUG_URL_CS)
  }
}

run()
