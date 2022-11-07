import Head from "next/head";

<Head>
  <title>MONOREPO-RTL</title>
</Head>

# MONOREPO-RTL

## INTRO

**Manage all projects related to react testing library using the turborepo monorepo manager.**

| project                        | description                                                 |
| :----------------------------- | :---------------------------------------------------------- |
| [docs]                         | document this monorepo. uses next + mdx. [mdx docs][how-to] |
| [rtl-examples]                 | components collection with tests                            |
| [rtl-ninja]                    | todo app with api and rtl tests                             |
| [rtl-taskhero]                 | todo app with api and rtl tests                             |
| <div style={{ width: 170 }} /> |                                                             |

[docs]: http://localhost:3000
[rtl-examples]: http://localhost:3001
[rtl-ninja]: http://localhost:3002
[rtl-taskhero]: http://localhost:3003
[how-to]: https://stackoverflow.com/questions/71864146/using-remark-and-rehype-plugins-with-mdx-in-next-js-with-next-mdx

## COMMANDS FOR ALL WORKSPACES

- run all workspaces in dev mode <code>yarn dev</code>
- start all workspaces in production mode `yarn start`
- build all workspaces `yarn build`
- lint all workspaces `yarn lint`
- test all workspaces `yarn test`

## COMMANDS FOR SINGLE WORKSPACES

- run a single workspace in dev mode `yarn workspace <app_name> dev`
- start a single workspace `yarn workspace <app_name> start`
