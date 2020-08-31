import * as core from '@actions/core'
import {slugref, slugurl, slugurlref, shortsha} from './slug'

async function run(): Promise<void> {
  try {
    const eventPath = process.env['GITHUB_EVENT_PATH']
    if (eventPath != null) {
      const eventData = await import(eventPath)

      core.exportVariable('GITHUB_EVENT_REF_SLUG', slugref(eventData.ref))
      core.exportVariable(
        'GITHUB_EVENT_REF_SLUG_URL',
        slugurlref(eventData.ref)
      )
    }

    exportSlugRef('GITHUB_REPOSITORY_SLUG', 'GITHUB_REPOSITORY')
    exportSlug('GITHUB_REPOSITORY_SLUG_URL', 'GITHUB_REPOSITORY')

    exportSlugRef('GITHUB_REF_SLUG', 'GITHUB_REF')
    exportSlugRef('GITHUB_HEAD_REF_SLUG', 'GITHUB_HEAD_REF')
    exportSlugRef('GITHUB_BASE_REF_SLUG', 'GITHUB_BASE_REF')

    exportSlugUrlRef('GITHUB_REF_SLUG_URL', 'GITHUB_REF')
    exportSlugUrlRef('GITHUB_HEAD_REF_SLUG_URL', 'GITHUB_HEAD_REF')
    exportSlugUrlRef('GITHUB_BASE_REF_SLUG_URL', 'GITHUB_BASE_REF')

    exportShortSha('GITHUB_SHA_SHORT', 'GITHUB_SHA')
  } catch (error) {
    core.setFailed(error.message)
  }
}

function exportSlugRef(ouputKey: string, inputKey: string): void {
  core.exportVariable(ouputKey, slugref(process.env[inputKey]!))
}

function exportSlug(ouputKey: string, inputKey: string): void {
  core.exportVariable(ouputKey, slugurl(process.env[inputKey]!))
}

function exportSlugUrlRef(ouputKey: string, inputKey: string): void {
  core.exportVariable(ouputKey, slugurlref(process.env[inputKey]!))
}

function exportShortSha(ouputKey: string, inputKey: string): void {
  core.exportVariable(ouputKey, shortsha(process.env[inputKey]!))
}

run()
