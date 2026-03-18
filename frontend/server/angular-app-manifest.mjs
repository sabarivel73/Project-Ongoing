
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
      "chunk-UHXL5D7G.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-A4U43RYH.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VYS373BR.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZIY53X75.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RNOJAAR7.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HFE3TEEB.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GA6MLSDM.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-47SPURTB.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-X7UPNA76.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SR26JOJF.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-O7HH7JJ7.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DPSOPENE.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-T4EH2IGL.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WCEEWMVP.js"
    ],
    "route": "/queries-v5t"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-23CQRXQF.js"
    ],
    "route": "/post-announcement-v2x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QBBJB4XK.js"
    ],
    "route": "/create-announcement-n3y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TYSVZWCF.js"
    ],
    "route": "/edit-announcement-m5z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-I3JNEMTY.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1226, hash: '74b09f1106c7672014fc295271ae1f8da55d97032417353c74b11ecb214230ce', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1441, hash: '8ef029f2c2803f062ac476eaaf3272af30190754a8369f43760141344e3bb64c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21897, hash: 'c66302db91cf2e2a8241d4e44770d1148e4fe1d11e588d6b521ca83fa8451dce', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10791, hash: 'c46d984170969de275afb37dd6d058fc1bdb5dcf3b5d9ec80bce31a955a3e4a6', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12197, hash: '15d853ad78cd94b7adf0b7b15499b41c6d6159649051e36434fb4ad024fe0c9b', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15783, hash: 'c169568613003e6af202d03e0eb665cd25d327397bd0ae5472a3c26fc652794b', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14714, hash: 'e75f9915990cdf0567733eb795a2315319cc38088611fb6d06f377cc009ec012', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 26015, hash: '7524766c6a85e2bb946fdca76f8656153697ff467252bc7c280016a0bdcc614a', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21562, hash: 'd49c9343697cfce0dc9bf9e1c4fdb6b1a55374ba5f081ed5e88ccc9545d55519', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16275, hash: '4215c6f2bf62ff41210f5066d60a6fac78179f68ae8d0af6796e1998d8513552', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 104994, hash: '5161eedf31136407b1cea72e9d54059715e918ffeb10c1776b7309dbd3d2f430', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12812, hash: 'b01d22bb62580d61738a4e8f3a06e237a888d7185206337ddbb0ac52bef23588', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19629, hash: '893e5fa86cfd786e0d875e7283025ceadfd40586456b9aecd33ff5c27987dac8', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14364, hash: 'e1ec918a297794808cdc88aaaed62fc61f7c3d013a0c095763b883f985001e76', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16648, hash: '1106a66df19938dc6bf7d798c551d20b2268b57f43bf5fe91190da575ffe99ef', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23511, hash: 'b7f41901583fb8110471c22142e3dbf74cfb6c13c6f01c0e43a4657281fe857b', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15476, hash: '8cc1901696813a49e8d01b5db5f858cf8fcdaed03c9c90fe74553c4c92900322', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14520, hash: '236739b2b33cda3dd7f7bf727ceadd02f7f2e9e5a04cad90c70adeb95164d66a', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25365, hash: 'fe721cda3297604bb02aa7fb1f3e755d6f4875be8f8619db41a102e3e951831c', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10897, hash: '18233309c5ab932f77f0f19ad737d911c81286b162913332ac06167012e6cfbc', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 11048, hash: '70922f8642989d3ec2320575be465aa91a2bc162cc6afe1f12f47f3e5f028534', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'styles-DYHGH45A.css': {size: 414, hash: 'lV9mD6i2Kkc', text: () => import('./assets-chunks/styles-DYHGH45A_css.mjs').then(m => m.default)}
  },
};
