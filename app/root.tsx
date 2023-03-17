import React, { useContext, useEffect } from "react";
import { IntlProvider } from "react-intl";

import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
} from "@remix-run/react";

import { withEmotionCache } from "@emotion/react";

import { configuration } from "~/configuration";
import { theme } from "~/core/theme/theme";
import { getGlobalEnvs } from "~/core/utils/envs";

import { ClientStyleContext, ServerStyleContext } from "./context";

import type { LinkProps } from "@saas-ui/react";
import { SaasProvider } from "@saas-ui/react";

/**
 * CUSTOM
 */

/**
 * META
 *
 */
export const meta: MetaFunction = () => ({
  title: configuration.meta.siteName,
  description: configuration.meta.description,
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

/**
 * LOADER
 */
export function loader({ request }: DataFunctionArgs) {
  return { ENV: getGlobalEnvs() };
}

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html>
        <head>
          <Meta />
          <Links />
          {/*<MetronomeLinks />*/}
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          {/*<script*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*    __html: `window.ENV = ${JSON.stringify(ENV)}`,*/}
          {/*  }}*/}
          {/*/>*/}

        </body>
      </html>
    );
  }
);


export default function App() {
  const { ENV } = useLoaderData<typeof loader>();

  return (
    <Document>
      {/*<IntlProvider locale={"en"}>*/}
        {/*<SaasProvider theme={theme}>*/}
        {/*<SaasProvider theme={theme} linkComponent={LinkComponent}>*/}
        {/*<SaasProvider theme={theme}>*/}
          <Outlet />
        {/*</SaasProvider>*/}
      {/*</IntlProvider>*/}
    </Document>
  );
}
