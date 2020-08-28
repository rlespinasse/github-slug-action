import * as core from '@actions/core'
import {slugref, slugurl, slugurlref, shortsha} from './slug'

//TODO
// echo ::set-env name=GITHUB_EVENT_REF_SLUG::"$(slug_ref "$(get_event_keyvalue "ref")")"
// echo ::set-env name=GITHUB_EVENT_REF_SLUG_URL::"$(slug_url_ref "$(get_event_keyvalue "ref")")"
async function run(): Promise<void> {
  try {
    exportSlugRef('GITHUB_REPOSITORY_SLUG', 'GITHUB_REPOSITORY')
    exportSlug('GITHUB_REPOSITORY_SLUG_URL', 'GITHUB_REPOSITORY')

    exportSlugRef('GITHUB_REF_SLUG', 'GITHUB_REF')
    exportSlugRef('GITHUB_HEAD_REF_SLUG', 'GITHUB_HEAD_REF')
    exportSlugRef('GITHUB_BASE_REF_SLUG', 'GITHUB_BASE_REF')
    // echo ::set-env name=GITHUB_EVENT_REF_SLUG::"$(slug_ref "$(get_event_keyvalue "ref")")"

    exportSlugUrlRef('GITHUB_REF_SLUG_URL', 'GITHUB_REF')
    exportSlugUrlRef('GITHUB_HEAD_REF_SLUG_URL', 'GITHUB_HEAD_REF')
    exportSlugUrlRef('GITHUB_BASE_REF_SLUG_URL', 'GITHUB_BASE_REF')
    // exportSlugUrlRef('GITHUB_EVENT_REF_SLUG_URL','')
    // echo ::set-env name=GITHUB_EVENT_REF_SLUG_URL::"$(slug_url_ref "$(get_event_keyvalue "ref")")"

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
