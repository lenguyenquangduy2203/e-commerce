import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IShopping - Home Page</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/images/logo/online-shop.png" type="image/png" sizes="16x16" />
      </head>
      <body>
        <div class="page-fade">
          <Component />
        </div>
      </body>
    </html>
  );
}