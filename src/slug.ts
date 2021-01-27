const MAX_SLUG_STRING_SIZE = 63

/**
 * slug will take envVar and then :
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`, and `.`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slug(envVar: string): string {
  return trailHyphen(
    replaceAnyNonAlphanumericCaracter(envVar.toLowerCase())
  ).substring(0, MAX_SLUG_STRING_SIZE)
}

/**
 * slug will take envVar and then :
 * - remove refs/(heads|tags)/
 * - put the variable content in lower case
 * - replace any character by `-` except `0-9`, `a-z`, and `.`
 * - remove leading and trailing `-` character
 * - limit the string size to 63 characters
 * @param envVar to be slugged
 */
export function slugref(envVar: string): string {
  return slug(removeRef(envVar.toLowerCase()))
}

/**
 * slug will take envVar and then :
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
 * slug will take envVar and then :
 * - remove refs/(heads|tags)/
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

function replaceAnyNonAlphanumericCaracter(envVar: string): string {
  return envVar.replace(RegExp('[^a-z0-9.]', 'g'), '-')
}

function replaceAnyDotToHyphen(envVar: string): string {
  return envVar.replace(RegExp('[.]', 'g'), '-')
}

function removeRef(envVar: string): string {
  return envVar.replace(RegExp('^refs/(heads|tags)/'), '')
}
