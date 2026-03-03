
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
    'index.csr.html': {size: 1128, hash: '7621d2e350c3e203a7896c53ff69e31ac90ea73a29cec902aae9785063ccfb47', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1441, hash: 'a1378de17fc8f85a8d30ffbfd8c8220800490bfb18a9527e9e523229ceca7097', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21799, hash: '6cb31bd2e5c1a28d9087eadfb1314467fde3736a5c39bd3de332f29afd55ee12', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10693, hash: '7f288cb67d1cd1c22c30458c88b1c2149d43d64031fc282b09f503d584ead4c8', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15685, hash: '74ea664e8f72d5d25163939f4514e0ac317ff06de8e7194e3963cba44dc1af32', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 25917, hash: '08538c37f4a09e56a90049434dfbc6413fda5b7f24dd2bc740c2c0c54bea63ea', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14616, hash: 'fe9b8a9a69fa659ce84a06170b31f17c8bb73175eaa3fcef10d1bb0a1cac0909', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12099, hash: 'd144b4348242e198f4d84b64732be0ff1db0be6947ae1701e277ddc59e647c29', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21468, hash: 'e178bfe1a664727cb8442c47fe836be2cdde576d8edd32499dac2a845cf44f0f', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16174, hash: '40b9f258dc81fb73fd9dadf2419c408e1bba6a22e6b2bec980e5ca28206aa5ba', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12714, hash: '5b9c0e601864989a4b7a55f8709270be01234577097095197d6a6a4b8d121978', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 50235, hash: 'e7236230828d010b2ebb8c76ab28f32503fa4ad9d6a7b80ffb134d88bd4fb1d3', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14266, hash: 'f6547c5cfa92872151c860c07d60a9e01a67ee59ea88209649487e7add4a5647', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16550, hash: 'b88c8edce3b62a87e245aeed56fd47a64effcd33da13a503d0fcb7a97c932728', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23413, hash: 'f54d92bfb3ee93a026a25340d26c628902c2c766e8ff9a9570f6449024160e19', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19530, hash: 'd27cf360e46fc5ac19f7100d89f0a4226f7e364710706439ace8b32d4577ee8b', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14422, hash: '1d7fe051d3ed360e123a7daba7aa5b18770748e52104018fdfbb88194e0cfea0', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15378, hash: '8b92c0b0f256a7d35d4c1b38bf7ebeaaabb870b0cb693258e2fe5fc0e705608e', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10799, hash: '1f5a05df2e0aaef0eae532c2716f97c49c53001f4287db2b71835d47d2341a69', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25267, hash: 'af1aecc8013c79c548658c58145a85b77141225f44fc940fbbb7ab0d64d7ac40', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 10950, hash: '6a212dd05a0af2cb68fa4a7cc75853413f336c5bbae309480f6ba62c10650fb1', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'styles-VXVM6HWE.css': {size: 76, hash: '94u4002xHfw', text: () => import('./assets-chunks/styles-VXVM6HWE_css.mjs').then(m => m.default)}
  },
};
