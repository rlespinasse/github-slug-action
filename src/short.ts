const SHORT_SHA_SIZE = 8

/**
 * slug will take envVar and then :
 * - limit the string size to 8 characters
 * @param envVar to be slugged
 */
export function shortsha(envVar: string): string {
  return envVar.substring(0, SHORT_SHA_SIZE)
}
