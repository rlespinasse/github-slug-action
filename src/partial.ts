/**
 * Get the first part of envVar
 * @param envVar to be split
 * @param separator of the split
 */
export function get_first_part(envVar: string, separator: string): string {
  return envVar.replace(RegExp(`${separator}.*$`), '')
}

/**
 * Get the second part of envVar
 * @param envVar to be split
 * @param separator of the split
 */
export function get_second_part(envVar: string, separator: string): string {
  return envVar.replace(RegExp(`^.*${separator}`), '')
}
