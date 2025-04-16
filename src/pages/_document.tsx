/* eslint-disable react/display-name */
import { ReactElement } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { generateCsp } from '../shared/generate-csp';

export default class CustomDocument extends Document<{
  styleTags: ReactElement[];
}> {
  render() {
    const [csp, nonce] = generateCsp();

    return (
      <Html lang="pl">
        <Head nonce={nonce}>
          <meta property="csp-nonce" content={nonce} />
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <link rel="preconnect" href="https://anesthetize.swistak.codes" />
          <link rel="preconnect" href="https://radioactive-toy.swistak.codes" />
          <link rel="dns-prefetch" href="https://anesthetize.swistak.codes" />
          <link
            rel="dns-prefetch"
            href="https://radioactive-toy.swistak.codes"
          />
          {this.props.styleTags}
          <noscript id="deferred-styles">
            <link
              href="https://anesthetize.swistak.codes/styles/fonts/fonts2.css"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://anesthetize.swistak.codes/styles/phosphor2/style.css"
            />
            <link
              rel="stylesheet"
              href="https://anesthetize.swistak.codes/styles/phosphor2-fill/style.css"
            />
            <link
              rel="stylesheet"
              href="https://anesthetize.swistak.codes/styles/katex/katex.min.css"
            />
            <link
              rel="stylesheet"
              href="https://anesthetize.swistak.codes/styles/prism-tomorrow.min.css"
            />
          </noscript>
          <link rel="icon" href="/fav32.png" sizes="32x32" />
          <link rel="icon" href="/fav192.png" sizes="192x192" />
          <link rel="apple-touch-icon" href="/fav180.png" />
          <meta name="msapplication-TileImage" content="/fav270.png" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Wszystkie wpisy"
            href="https://swistak.codes/rss-all/feed.xml"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Wpisy ze strony głównej"
            href="https://swistak.codes/rss-main/feed.xml"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Wpisy off-topic"
            href="https://swistak.codes/rss-offtopic/feed.xml"
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            title="Wszystkie wpisy"
            href="https://swistak.codes/rss-all/atom.xml"
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            title="Wpisy ze strony głównej"
            href="https://swistak.codes/rss-main/atom.xml"
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            title="Wpisy off-topic"
            href="https://swistak.codes/rss-offtopic/atom.xml"
          />
          <link
            rel="alternate"
            type="application/feed+json"
            title="Wszystkie wpisy"
            href="https://swistak.codes/rss-all/feed.json"
          />
          <link
            rel="alternate"
            type="application/feed+json"
            title="Wpisy ze strony głównej"
            href="https://swistak.codes/rss-main/feed.json"
          />
          <link
            rel="alternate"
            type="application/feed+json"
            title="Wpisy off-topic"
            href="https://swistak.codes/rss-offtopic/feed.json"
          />
          <script
            nonce={nonce}
            async
            dangerouslySetInnerHTML={{
              __html: `
            var loadDeferredStyles = function() {
              var addStylesNode = document.getElementById("deferred-styles");
              var replacement = document.createElement("div");
              replacement.innerHTML = addStylesNode.textContent;
              document.body.appendChild(replacement)
              addStylesNode.parentElement.removeChild(addStylesNode);
            };
            var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
            else window.addEventListener('load', loadDeferredStyles);
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
