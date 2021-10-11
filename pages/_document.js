import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import logo from "../public/logo.svg";

export default class MyDocument extends Document {
  /**
   * How to make styled-components and Next.js work to together
   *
   * This piece of code takes getInitialProps, which is an async function
   * https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
   *
   * That function takes a context object `ctx` argument that contains info about the incoming data
   *
   * Additionally we leverage the ServerStyleSheet function styled-components gives us:
   * https://styled-components.com/docs/advanced#server-side-rendering
   *
   * @param {*} ctx
   */
  static async getInitialProps(ctx) {
    // This gives us an object `sheet` that will use house all the styles from a single page
    const sheet = new ServerStyleSheet();

    // The original payload incoming to this function, we want the `renderPage` data
    const originalRenderPage = ctx.renderPage;

    // Unpack the page we just put into the variable
    // In this case we are wrapping `<App>` with collectStyles which can read our entire app
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // Get all the info from the incoming request
      const initialProps = await Document.getInitialProps(ctx);
      // unpack all the props and get a string of all the CSS with .getStyleElement()
      // this will get injected back into the <head> by Next.js and your styles are now where you want them
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      // apparently .seal() is some kind of garbage collection ServerStyleSheet() needs to run when it's done
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href={logo} sizes="any" type="image/svg+xml" />
          <link rel="stylesheet" href="https://use.typekit.net/xgf1cpe.css" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap"
          />
          <script 
            async 
            src="https://www.google-analytics.com/analytics.js" 
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                  ga('create', 'UA-13226656-2', 'auto');
                  ga('send', 'pageview');
                `,
            }}
          />
          <script 
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '3047515995261591');
                fbq('track', 'PageView');
              `,
            }}          
          />
          <script
            async
            defer
            src="https://static.cdn.prismic.io/prismic.js?new=true&repo=peopleforbikes"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
