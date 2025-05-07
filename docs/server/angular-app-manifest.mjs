
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/menu",
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/menu/login",
    "route": "/menu"
  },
  {
    "renderMode": 2,
    "route": "/menu/login"
  },
  {
    "renderMode": 2,
    "route": "/menu/planilla"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23570, hash: '4a8375c51547c8604dcb5d52b0aa75edf1cf74cee707703b37eced08f6349386', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17144, hash: 'd446774d79ac2532ceecbecaf94f006dfaa6b4ba1ff3910a13d1d69aadd4f488', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'menu/login/index.html': {size: 106834, hash: '6f74ef2e98e7b565353fc164c2f4eb4fac2c36a58c836163c3fea393c61dd67d', text: () => import('./assets-chunks/menu_login_index_html.mjs').then(m => m.default)},
    'menu/planilla/index.html': {size: 143742, hash: 'ec64a600228ed045531f59113e20a42f112f424d3b56c00a1b960dd7456a4530', text: () => import('./assets-chunks/menu_planilla_index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
