
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
      "chunk-M2LC7VZB.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JHPFI7QY.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TTV25Y5Y.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-V3WYAISO.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RQEGWNL7.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-EBSMRTSO.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YDYDU4ZP.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XWMFZPTW.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SIFKYNTP.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5PJQY3X5.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DDZ7B75M.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4IJL6343.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NHZ5AOW3.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BRUBBT2R.js"
    ],
    "route": "/queries-v5t"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YO7WDMO5.js"
    ],
    "route": "/post-announcement-v2x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JQB7AIRO.js"
    ],
    "route": "/create-announcement-n3y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-M4LGNJDH.js"
    ],
    "route": "/edit-announcement-m5z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-G6D5NRTW.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1128, hash: '169c0bb7d573797e3a215797756901eb77519ad49932c2f344ccc10e1856a806', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1441, hash: 'cd59b7ba46b7d6bcd139b79cab18e3cdb2f66d312321d6a9104c91a07c85e01f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21799, hash: 'e28415bd0bb546d88eb0f1971fdf1e949863507149d10c891cc62a9134a27259', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10693, hash: 'a3eb41efd62f241acfee81ebd54a859108e3f0a81c9cf27072278e8cb709160a', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15685, hash: '8022f0b9a50b1b3bdf4e8c36bd40c1cf57833a7fbc9c912cc7444527e5329115', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 25917, hash: 'd8bd2df120d590cef12705a60e5b33dd79796026967f68405f3137356ead4387', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12099, hash: 'e04c06da9a30ba1c93e71de8ce49c25dd764ff467828de4c73c85b41285140c4', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14616, hash: '61f8789847627bbd00cade5223ad636926dc8e8ea99dd347748f84599aebb507', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21468, hash: '42d5ce43b5a482bec45442116ed6ec1964b8fe52bc8f22f8eea81872cef255c5', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 61704, hash: '8436bfdf1c8eae699f2fe7ca5c794fe9f7b6c5c5e208e0b08a85f25626aa4d71', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16174, hash: '92aa4682276e90b7075f21420b51afd1843d4ee6e5e6e842ab310a06e68678be', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12714, hash: 'e8e4215ee25b0470b1945b4e5f42778b565eeedb5863c7dd9f023a4c6dd5084a', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16550, hash: '3d586be8fa9d77bd7d818625d4ec31c6d7d9d5d300cb9ddc9077d466805f7e92', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14266, hash: '88814a6ecb63781f431cc9716bf7caef7df8d23e0783b826d53f7cd03bbcdd96', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15378, hash: '8223f935a727e62f0093a79e66b8340382af88005688672466a4f60a0d8df122', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14422, hash: 'fd4b8e643649a3e7e7c4ed11075df4538657909f855deb8f7b22182a537055ba', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23413, hash: '39b03f35303f17c043d17eb52b52213f4023f1923aca0e0e69906b9a5a40330b', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19531, hash: '920f1d0fbc61903417f3a3de6d62d879cb0045d1d7ddd1230688fd2b8b70be9d', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10799, hash: 'de24ef64ae74cde5371bca6bad5e523ccbd48cc0fe8c8fcf5ce536afcf909bc8', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25267, hash: '548a8ca45ab808a9ab5b1120cc0ecb7477d679ce2b6bb7b6a7726cc16517e341', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 10950, hash: '9836dff097b368f96e01ece32f6216b0bb7ff35cf9c64c603861d97218bd30e5', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'styles-VXVM6HWE.css': {size: 76, hash: '94u4002xHfw', text: () => import('./assets-chunks/styles-VXVM6HWE_css.mjs').then(m => m.default)}
  },
};
