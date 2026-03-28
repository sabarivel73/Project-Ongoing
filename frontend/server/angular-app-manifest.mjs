
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
      "chunk-IS4KWFUB.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4O4N75NK.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-AKSURZRM.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2PTEFOBM.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XFRMMODA.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NR4LTCEG.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-U3R6VAXH.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2Y3EUKDN.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OYGNVWIN.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-74FXKDJH.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6WLM2MHY.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-M2FOOSP3.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VGM6IVDK.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RZQGUMDW.js"
    ],
    "route": "/queries-v5t"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3YYL6YYU.js",
      "chunk-VEZKMYIB.js",
      "chunk-WNQ4N7RJ.js",
      "chunk-CIHM7STN.js"
    ],
    "route": "/post-announcement-v2x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GOCUUVU7.js"
    ],
    "route": "/create-announcement-n3y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7SUKZUQR.js"
    ],
    "route": "/edit-announcement-m5z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3NQ46PIC.js",
      "chunk-VEZKMYIB.js",
      "chunk-WNQ4N7RJ.js",
      "chunk-CIHM7STN.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1394, hash: '0096e6e96cdf8ab4c078a99ea9ba2585363061f19944ff922dd7dc03efa694f1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1609, hash: 'd42f54452bd997a975899030e4b5f6100b59527cb3abc879f1d0b7fdbdd74a2c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 15818, hash: '5c0fd937bc14c935b71189231ec27a4181f99dc8efe41e150ff6fcd2afb114e4', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 15664, hash: '27fb3e1e15e5c8d824f0a8d681ca02bb9156c5553e20769f32be924fb6e5a7a7', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 12094, hash: 'd22d7a3862c1a8e0d71f7e2382eb0087153e9038ed36b80f6a7bc6ce452c73ad', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 17951, hash: 'c33caf192ba29d57f899d48b1a67b668088ea33d9cae808a4c9ebf41f0951c52', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 16773, hash: '0a03e628afdab5fd882d400a5cd85368f4354f7623a381666d9c812a5e62f0a2', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 21139, hash: 'fa625dbf484aa4f85cfece32c09e77a7144f23fad48fd1cfff9909191184ad91', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 26824, hash: 'd97dc51b849c8072d7ea9d589b8462940195fa39ddda2e7a46dd2ce663ba0447', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 24814, hash: 'd08f11547ee04893c21cc254eb6063c7391303201e535f8d8eee4bbdbcd8fa5b', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 12200, hash: 'd969848f943ef1cd133aa91c622894cbeffbd81a22184387cebe685361951182', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 22065, hash: 'ace3d27d7919052c2c2e8d373266baa08ccaa8d16873a011f856128162541476', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 12351, hash: 'd7e74ef880759cee96bcb87eadbd47cf3164cfc27d3e7326c3bea72b347ecaeb', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 17579, hash: 'c14df92a836980421d1db25f02c7262572dec9ce91d234bcf92134658ec8a2f8', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 16021, hash: '6e0e72adfbfd9e722ab1a6d3269322d6bf9209f265cee3d3624be51b4449f49c', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 27323, hash: '434ae858f604547e55987c373349d3023decdcf2d19ca1ed3afd1231073a2d6c', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 14118, hash: '1b9d0540b8fca58f8325c00d73bd4bc1f0c7cd2065e64c1c71cce49cb3d544ac', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 22870, hash: '35eadb097e9fcf50f5520365c872feab503d9ddb757a1358509731ccc2e5fc0e', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 13504, hash: '590db1f830b7c6a552d1047c5ba31f1d2ab70d80f6489c6dad79f00c81341869', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15951, hash: '57111f1484fa2daa9e0f17f4dc927a6d9a42bea5d38b66ddf548fc0c3a581d0b', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 112945, hash: 'c7c5eb0b958a6a4bf2fff73e892b65a2d26ffb7ccc48d810211ca7cf3a7af04c', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'styles-X2DWCALA.css': {size: 1549, hash: 'e7Qa8a8V0o4', text: () => import('./assets-chunks/styles-X2DWCALA_css.mjs').then(m => m.default)}
  },
};
