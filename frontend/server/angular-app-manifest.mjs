
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/auth-v1",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/auth-v1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-F7UNNQRD.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WBK6RMRB.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-UARURZQK.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-H6CBMQUU.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OBHRUAEP.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-U42Y6GUA.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-44PNSSNK.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CGUQPE2I.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-S2OF4T5A.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TPI463PD.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-76UCT73A.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XTPCCE4C.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6T5F2ZTL.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-UORX7ITD.js"
    ],
    "route": "/queries-v5t"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2OQSQJTA.js"
    ],
    "route": "/post-announcement-v2x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IL5TCZWB.js"
    ],
    "route": "/create-announcement-n3y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4KQHMVL4.js"
    ],
    "route": "/edit-announcement-m5z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OH2SZ65N.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1128, hash: 'ae74022ce68eda151c79005ccb68b6e5cb3266eae06addb8287097a3762850c8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1441, hash: '46a6a7b5c3beac19f294728758b13eaa71e226aab7a49d10bf1ef87ad7fdb3bb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12099, hash: 'cd2393080d0bb235891064b4c5f6bbbc9bf8abb5b74cda18790da40c5afc97f8', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10693, hash: '8fc87faa003cec79d799a364e510fc8320bae5127e1d2eeef40fa95d045a3006', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 25918, hash: 'f885407241a45d8574b52cfd5773d58b4f0a1b992193299c984a7d88f1c43484', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14616, hash: '0080f207bbc4f175d787526f87c7255f71aacd3d92abae5bf867068b58b69f05', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21799, hash: 'e417a9f6749f8290525096cf7aab45ed60307f09d46bd0a31d35e59dc694b5a1', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15685, hash: '6558af38ee495fe98a70e37fb965093413e5b97137406e6c941472701643c8f0', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21469, hash: '754fe1d07fa0f9cce804451bc22758b94c9bb229aa3d030126e3b9a36c0cc709', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16174, hash: '9ef321fc212db0ef0e2e6c3f83b06a22fd54e7694cf6ee727d2a779bdc45c11f', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 50231, hash: 'fcdce7fa353aeb22babf8df961d5597cac824c87d4d9844378f34df79c1765c5', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12716, hash: '7bb108b1c38ce34b3de81bb72a2db9a11e067468c113eff222dc542520c7202c', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16550, hash: '75ef37d099b52fc891b33228702164aaf40fe3c0e760fef932e42d3c748a53d7', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19529, hash: 'd8b878ba134d33da2dee576e78ffaa4984115a70ab8e2de453f70498c8cf3b97', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23413, hash: 'c4ca9ecb70b7403b39bd36bbf58ca7a49a31737b0ecba52b2da2337eadb3cb8a', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14266, hash: 'c9009f016221d632759cea3e1594002cbde998b65eeb5867340e187a07f72bb2', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14422, hash: '78d9db7f5d5bc745791b89b637c1b2f1d0a8f0511213735d4bcf08ef0feb0f7b', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15378, hash: '48de71a42b705f6b45b1620b7dbc50b2826c3a10c6194edb685e18811e30a1a3', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25267, hash: '19af1026566d944c87105ff1880edb27b26425ae37bffdaa4c44dee34e4553b1', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10799, hash: '7da462c9f85dbc676bd3a67524d0dcf25b3303affaf4c798a38dc269a8fd0855', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 10950, hash: 'dbc8194a885f9d8d81b6bdb8253d81fee123cc20888d2befc29409639b7548f4', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'styles-VXVM6HWE.css': {size: 76, hash: '94u4002xHfw', text: () => import('./assets-chunks/styles-VXVM6HWE_css.mjs').then(m => m.default)}
  },
};
