
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
      "chunk-MOHEFTM6.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4E5HMIRY.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZJB6GVMJ.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MINTOQOZ.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3RNAVAR6.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-H5I7ECYN.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GQVBPUKE.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FJFZM4UD.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5GMA6AI4.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-A6PTXKEX.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4STVTB2P.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-G4PNTDKK.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-V5V4477A.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XDDN2OUP.js"
    ],
    "route": "/queries-v5t"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OU7DSF4E.js"
    ],
    "route": "/post-announcement-v2x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LJ4HGH6O.js"
    ],
    "route": "/create-announcement-n3y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BCL56HDR.js"
    ],
    "route": "/edit-announcement-m5z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-P2WB6LJB.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1323, hash: 'd743acf2619ef468d7b4924b832cd350a8690c9244f3c891a226e4486b244def', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1538, hash: '438c1a51da43b4a559e339847ec87926c7bfecac722ec893dadacac421b834e7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10888, hash: 'f7f8da8be9c451ce5eb68fb0fdeb4b1399373a76aff4f74c0aac7fcc8700bcc3', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12294, hash: '44b55b621b0055992206fcd1daed1e2dbf2220f855ea9a0594c1135751db6273', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21994, hash: '030fec2784870b8ca3e8a84eacdfca99f806e5bd425a6b0540c68f1b6afe490d', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15880, hash: 'd49a31ec7e8255722665246d76990a2d6749114038aef3707541ee6455fed481', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 26112, hash: '8712908cac26a1b707bacd858e68710c6ca47c8324c6a4a847ec06ca1c263e5c', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21659, hash: 'f1216f92ed95a586f382307332e395099d0f43dd86844aeee30a84f8da09343e', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14811, hash: '2bf842366a1f7604e838326165b15c7321c0634b85b005f85201aa313eecd8f4', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16372, hash: '611c55c98073b55cda9af69d4938264ba4139c426b6022f5cc443aaae444517d', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14460, hash: '53ded503bb89249f872bd140d66f4837d638778cd891b5511e99141074a6ef0a', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12909, hash: '6b1c89a8fee782e5b08ea1aae7c84fd74e7d77c454e50709841a5ee2c34b1696', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16745, hash: '9f408c1053d89c503d4de7ee8139e8fc1f1b1c05ffa8eafe5ea2f4b0f7fbe288', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 105094, hash: 'a9453c9115f3af3575b3e3e19dfa3837b4dbbd1fefbe3ec8ef99b08d1f58324a', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19726, hash: '24dceccd5d5945ce0dd12d9459f7e8083e90a5b5f9c4d827d80eb0f1e3c423a0', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23607, hash: 'a6133829656c84f7710c47f6f5ead1e627e392b55d3d25562ccaebd782bffcb2', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14617, hash: 'e6ec2170d585f0cccef130e24936ed2402651c235a86ded46340133513d9afd4', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25462, hash: '5f3df42a9077d91bd351e0ccb337a4b2e97776a267007c20117d4d064f5c3b80', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15573, hash: 'fee7eac57468002f9b5e5144e5e8e6267c73e21f4bb98253f859de03f7375872', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10994, hash: 'ce72bbc06af267b6ab0cfd9f129ac56b086c28479f20d239eb326bbac74a3fc6', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 11145, hash: '18ce6ebca2a24139ed397a0247c0d7ed9d9105959e3c2dc76a86cd9dc1d1a21f', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'styles-DYHGH45A.css': {size: 414, hash: 'lV9mD6i2Kkc', text: () => import('./assets-chunks/styles-DYHGH45A_css.mjs').then(m => m.default)}
  },
};
