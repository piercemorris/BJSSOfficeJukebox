export const imports = {
  'alexa/README.md': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "alexa-readme" */ 'alexa/README.md'),
  'components/doc/Error.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "components-doc-error" */ 'components/doc/Error.mdx'),
}
