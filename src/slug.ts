export function slugref(envVar: string): string {
  return envVar
    .toLowerCase()
    .replace(RegExp('refs/(heads|tags)/'), '')
    .replace(new RegExp('[_/@]', 'g'), '-')
    .substring(0, 63)
}

export function slugurl(envVar: string): string {
  return slugref(envVar).replace(new RegExp('[.]', 'g'), '-')
}

export function slugurlref(envVar: string): string {
  return slugurl(slugref(envVar))
}

export function shortsha(envVar: string): string {
  return envVar.substring(0, 8)
}

export function slug(envVar: string): string {
  return envVar
    .toLowerCase()
    .replace(RegExp('refs/(heads|tags)/'), '')
    .replace(new RegExp('[_/@]', 'g'), '-')
    .substring(0, 63)
}
