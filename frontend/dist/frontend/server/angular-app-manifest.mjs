
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
      "chunk-YV2PNQ2A.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BE2EHO4V.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-UDMJMAH4.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-C3UOAXPM.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7P3QWSWE.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SAJLOYLY.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-O2GR26Q4.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-V7WI7GD6.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QLHIHFWA.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ONJ2N5XV.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OW5ZIQ6L.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JXX74FCU.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZILSTUCG.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-M5SBX3GX.js"
    ],
    "route": "/queries-v5t"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-COVCIJPI.js",
      "chunk-VEZKMYIB.js",
      "chunk-WNQ4N7RJ.js"
    ],
    "route": "/post-announcement-v2x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4S7Z2PBC.js"
    ],
    "route": "/create-announcement-n3y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FS4C2XLL.js"
    ],
    "route": "/edit-announcement-m5z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QEBIIUDM.js",
      "chunk-VEZKMYIB.js",
      "chunk-WNQ4N7RJ.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1445, hash: '4232d96fb253509ef31b50b6eab03412951dc7df1429d3a4e60cdc4bc0a3c79a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1660, hash: '70710bf0b8c51e2d21391e5ab52d49a0b6abd7a2a30a33b06bcec082701b12d4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 15846, hash: 'ddada0e768eba28f566c7353b21e3401dcc3a80ab79a440df54ed505cfc99f9b', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 16112, hash: 'c0a11d21f8d08c987b5b08bb49112fa3b6e316aa82e7d12d021c44e220257269', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 15895, hash: 'b73edd00014447f554b8bc4df90dfb0d72625e4a32fd7c527a937d9a2439c283', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 18067, hash: 'e5a1f2f1d9d57f3ce41e918e48b5fa0b0b423cccaeac792cfd80c046f417c836', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 12211, hash: '80c6ac5ef40f0e348b596f9743ad1e41add4b2ac70d22409550658b6cc56afe4', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 16896, hash: 'cef4ca8f05484d61ae1d106e58f7a563d9771971325c4d75778153e4b54d9e7f', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 21441, hash: '8104505f569a1122bdf6b17df98217a1826362affc01bf4f16812c7d430f50c1', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 26884, hash: 'e74fc85a6b2bd05506504932926882f1b79057e14936a5555a79fb612e07d251', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 12317, hash: 'b3084ec65492b2e8c4290b2eb950e291b006c412e99d92f2e9ae0c453ee6939e', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 24931, hash: '2f2c43c9e6a39a77046e24223fce043fa0fc446157ea25bc8f90a6892e004272', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 22224, hash: 'bc4bad38685a60d0ea9a9d65faae9a3118289240078713b24210525073f0aa52', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 12468, hash: '47a1f8e160b09b2ad7db1eb7391f66d8f3c8d45d72107cd583bee770291090d3', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 17693, hash: '3529eb776b532f4d77f3fc5f41cd6eb9b80c70157a73604c3baccad11760a975', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 16138, hash: '064a74070a9721db26221ff966e429a8ba2fe1a96aee3f80428cbbcad20c2ecd', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 14239, hash: '24e296a2ba3e349fefbba16f4a3106e3ca3683686974c66085e98988478949c7', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 27440, hash: 'e598c582941df8ecb817141c0b1aca730d9607ee56f033ed1c972af2e8edfe9e', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 22987, hash: '8b5f5f60294db2ff95f2386e0da42f8cd2136333687edb250d1d8c1b48d24bff', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 13621, hash: '138ff9b1315043076c55e88e5b5815eddaff71759d6fe16ea86b03755520bd88', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 113052, hash: '39410bd5d8a34140a4ee828e53ef2dbaa4031d356ffd89c31e90be74003c75b9', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'styles-A2RWAEMD.css': {size: 2354, hash: 'UncEvdLwx1g', text: () => import('./assets-chunks/styles-A2RWAEMD_css.mjs').then(m => m.default)}
  },
};
