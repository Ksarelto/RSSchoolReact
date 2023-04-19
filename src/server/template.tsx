import React from "react";

interface TemplateParams {
  cssPath: string;
  jsPath: string;
  children: JSX.Element;
  store?: unknown;
}

export function Template({
  cssPath,
  jsPath,
  children,
  store = {},
}: TemplateParams): JSX.Element {
  return (
    <html>
      <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="stylesheet" href={`/client/${cssPath}`}/>
          <title>RS - React SSR</title>
      </head>
      <body>
          <div id="root">{children}</div>
          <script src={`/client/${jsPath}`}></script>
        </body>
    </html>
  )
}
