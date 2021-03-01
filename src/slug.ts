const MAX_SLUG_STRING_SIZE = 63

/**
 * slug_cs will take envVar and then :
 * - replace any character by `-` except `0-9`, `a-z`, and `.`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slug_cs(envVar: string): string {
  return trailHyphen(replaceAnyNonAlphanumericCharacter(envVar)).substring(
    0,
    MAX_SLUG_STRING_SIZE
  )
}

/**
 * slug will take envVar and then :
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`, and `.`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slug(envVar: string): string {
  return slug_cs(envVar.toLowerCase())
}

/**
 * slugref_cs will take envVar and then :
 * - remove refs/(heads|tags|pull)/
 * - replace any character by `-` except `0-9`, `a-z`, and `.`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slugref_cs(envVar: string): string {
  return slug_cs(removeRef(envVar))
}

/**
 * slugref will take envVar and then :
 * - remove refs/(heads|tags|pull)/
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`, and `.`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slugref(envVar: string): string {
  return slugref_cs(envVar.toLowerCase())
}

/**
 * slugurl_cs will take envVar and then :
 * - replace any character by `-` except `0-9`, `a-z`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slugurl_cs(envVar: string): string {
  return slug_cs(replaceAnyDotToHyphen(envVar))
}

/**
 * slugurl will take envVar and then :
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slugurl(envVar: string): string {
  return slug(replaceAnyDotToHyphen(envVar))
}

/**
 * slugurlref_cs will take envVar and then :
 * - remove refs/(heads|tags|pull)/
 * - replace any character by `-` except `0-9`, `a-z`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slugurlref_cs(envVar: string): string {
  return slugurl_cs(slugref_cs(envVar))
}

/**
 * slugurlref will take envVar and then :
 * - remove refs/(heads|tags|pull)/
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slugurlref(envVar: string): string {
  return slugurl(slugref(envVar))
}

function trailHyphen(envVar: string): string {
  return envVar.replace(RegExp('^-*', 'g'), '').replace(RegExp('-*$', 'g'), '')
}

function replaceAnyNonAlphanumericCharacter(envVar: string): string {
  return envVar.replace(RegExp('[^a-zA-Z0-9.]', 'g'), '-')
}

function replaceAnyDotToHyphen(envVar: string): string {
  return envVar.replace(RegExp('[.]', 'g'), '-')
}

function removeRef(envVar: string): string {
  return envVar.replace(RegExp('^refs/(heads|tags|pull)/'), '')
}
