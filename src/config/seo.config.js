const SITE_TITLE = 'Bank JS'

export const getGlobalTitle = title => {
  return title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
}
