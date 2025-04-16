/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://swistak.codes',
  sourceDir: './.next',
  outDir: './public',
  generateRobotsTxt: true,
  exclude: ['/xmlrpc.php', '/wp-login.php', '/licencje', '/2137'],
};
