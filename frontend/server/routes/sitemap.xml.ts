export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'http://localhost:3000'

  const staticUrls = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/projects', changefreq: 'weekly', priority: '0.9' },
  ]

  let projectUrls: Array<{ url: string; changefreq: string; priority: string }> = []

  try {
    const data = await $fetch<any>('http://backend:8080/api/projects', {
      timeout: 10000,
      retry: 1,
    })
    console.log('[sitemap] API response:', JSON.stringify(data).substring(0, 200))
    if (data?.success && Array.isArray(data?.data)) {
      projectUrls = data.data.map((project: any) => ({
        url: `/projects/${project.slug}`,
        changefreq: 'weekly',
        priority: '0.8',
      }))
      console.log('[sitemap] Found', projectUrls.length, 'projects')
    }
  } catch (err: any) {
    console.error('[sitemap] Failed to fetch projects:', err?.message || String(err))
  }

  const allUrls = [...staticUrls, ...projectUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, changefreq, priority }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setResponseHeader(event, 'Content-Type', 'application/xml')
  return xml
})
