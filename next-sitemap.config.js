/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://swistak.codes',
  sourceDir: './.next',
  outDir: './public',
  generateRobotsTxt: true,
  exclude: [
    '/xmlrpc.php',
    '/wp-login.php',
    '/licencje',
    '/2137',
    // spam tarpits
    '/fuck-spam',
    '/pl/contact',
    '/pages/contact',
    '/pages/kontakt',
    '/t3-kontakt',
    '/kontakt2.html',
  ],
};
