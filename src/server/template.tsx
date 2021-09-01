
interface TemplateParams {
    cssPath: string;
    jsPath: string;
    content: string;
    store?: any;
  }

  export function renderTemplate({cssPath, jsPath, content = '', store = {}}: TemplateParams) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <link rel="stylesheet" href="/client/${cssPath}"/>
          <title>RS - React SSR</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>window.__STATE__ = ${JSON.stringify(store).replace(/</g, '\\u003c')}</script>
          <script src="/client/${jsPath}"></script>
        </body>
    </html>`;
}
