
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
      "chunk-SNIK3SPC.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QQSMKKYE.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NQZ23AER.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-X5UAUOYZ.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6RSOQPSX.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MATKYG2S.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YU7M4QQH.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5S3SJOOE.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AYUBTGU6.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YPTLOMH3.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LX5CJMOM.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NYSFISWZ.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JCKKS3YA.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2YBLRVZS.js"
    ],
    "route": "/queries-v5t"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TKPK274B.js"
    ],
    "route": "/post-announcement-v2x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LO3N26E3.js"
    ],
    "route": "/create-announcement-n3y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-X6SYFYTJ.js"
    ],
    "route": "/edit-announcement-m5z"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1128, hash: 'cd63c4c06dc27719370aae10c6c39785391e73edd7e08355c14f30d7c9c61774', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1441, hash: '02c471dc4d63f150e742efae30d8acd33882931b81456e67bf72fba2c9fd6d0b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21799, hash: '4930167683320d5b9253c71b7090094e4f402833a803a926a849e76b45984905', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 25917, hash: '7deefaf2b4b077385b3102ceb28fe76a99dee353d83096bbb14603dd2b92e42c', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15685, hash: '2a4de919c93070279167c51b4e3826d1110002914db7f5b60efe280ead348ef8', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10693, hash: 'ee23de7b675bfc689088bf32d08373c74e0a98c647d562edf93174058466a018', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12099, hash: '6284cb3f23775ec630a63b75036cd5cea2f2e2b1cded4d6f88c4655be9ba913a', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14616, hash: 'fbc3bb7dd639e1739f3817fae239d7982939b4622a6ab31cfcce0ffc944eb4b2', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21468, hash: '0d0686a6b1680fc4b56bae8fac15c8b1389d622303d802f0798e5f3d7ba24271', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16171, hash: 'df2483c67476cd79a59c71c8364c568067cba35404e6caacc9b0210ef9533c0f', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10797, hash: '23058898f47a23e994a4a953dfc360665a986e39033f71774a9aaf15d5058d59', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 10950, hash: '1954a4ce071901fb500e46e5521f4ef95ef7cedcaca3cc73eb4abe3e5b42b6a5', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14422, hash: '31d73e651910fadb2d5f744aea351500336d4ab8b7ed5631cd1084856915bf6d', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25265, hash: 'dce82549a499bb8f4718b4078a31ea376c1df4bdf55c5ae9d485c1ae1799a7d7', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15377, hash: '65d1ab594fc8ebbf5d19140e1e4c40bc2ccb3f8e34ac2407fa71de3235b69e04', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16550, hash: '39e1e7df8422da292c4c6320f3c7ab7b4b75a06c8647959b40a7b4cc9bb117a6', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23413, hash: '805ad977cf2710df32b77fd22a41d03bba9a06803b08199e456479cf81e62e08', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12717, hash: 'd84b91f5952994b75c136c7d87679a9fb03350aec7f51d4b42e269a1ba69beac', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19531, hash: '38d70a3d991598b992de98fff75efe201ad7cbbb62fcf23291b47cc5659b8441', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14266, hash: '46a7f9bc1dc3a6085020fa5eeb4941bd89c1a2ece1de2541017418d57dc21eb2', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'styles-VXVM6HWE.css': {size: 76, hash: '94u4002xHfw', text: () => import('./assets-chunks/styles-VXVM6HWE_css.mjs').then(m => m.default)}
  },
};
