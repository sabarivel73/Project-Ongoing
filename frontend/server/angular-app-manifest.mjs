
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
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KJ5VD5ZA.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1128, hash: '1d47888d0d4656381a8d6f1fef01aa51570ee9254c51b507f902ddf3a3f0df3c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1441, hash: '984a400dabe5b70a5c81bec1d5cf020a7dc985ef6d29533909070e18a6d0fa16', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12099, hash: '80eb5f381268c70c5f6a9dc97e69b13c3761511d220e1fdaa7fdf644ec38eb14', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21799, hash: '26f2cb144bb2a2cf7fe733eb8092112f37320496a42357d4e547f6c2b3792ee7', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15685, hash: '896ec7ebf360d36984d6df2d4b65045ad756bc9e0a3a39c57c562268cc0168ec', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21468, hash: 'cfafd08ad3f31b83831e9b814772def7e3df85acf4a0863114466c344a5fc562', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 25918, hash: 'ae16176f0929a17dafde7f9d26808ddb7ba121979417e28625988177d31f85e6', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14616, hash: 'c96ba2b48c06264f62fe2e8e094c18cda9f141d94fc91a1532a782a71129e8f4', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10693, hash: '1a25305de5a44eb736e3f3563f06bae85d75a68def9060569cc42d670dd06869', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16178, hash: 'a8181c04ff5de4310cb28b4ea553366835db883301b81af7a8657a66c1002307', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 20014, hash: '6fb4f9ffe0758898b4ac77e46360c69df408c6ddf8e0b98ed780008d981e49e2', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12714, hash: 'c8be6a4993c13d8f1e14f2012f57c99c7ba8098f0f0c0739728f63db4b45a5f5', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19531, hash: 'c852ab3cea2390ddadd5552f3ecdec0e59d34832ef51e1835e9c886cf0842357', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16550, hash: '1bd83053d6184af727e95b1a6f575f7d340b2e9defe697a935bd8a4906bb0cfc', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14262, hash: '86aa6df91639023808ca2a0cebba901eb136d597ee15fb31ef303b7b34bf9718', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14422, hash: '0f4dcbb1f60a376f504aa5fd12216d26e5dec6584fcfcf48f89cfca6ae6fbbde', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23411, hash: '33ed5506261745fe50f151bf00fd36941e80662a14836237a55a3b9540554647', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10797, hash: 'dc984ad2cc85cfbc1f6037d6045b894deedb263b2035ff5bca26bb068606fba9', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15378, hash: 'e71077104d350aa6b52dd076b8e9da3979738c50b6d6645f70500a6489e8ffa5', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25267, hash: '42b1296e9fe3484f14be8bf6d76604343c8ae5a0e7fc9a84a5bb694a9f6e4b4b', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 10950, hash: '3a992f81aad4bb515a8cf71444e8406013f25f0075a03ad3c05c90e07fa8e4b1', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'styles-VXVM6HWE.css': {size: 76, hash: '94u4002xHfw', text: () => import('./assets-chunks/styles-VXVM6HWE_css.mjs').then(m => m.default)}
  },
};
