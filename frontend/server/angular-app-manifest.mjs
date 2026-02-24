
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
      "chunk-L7JCCYHK.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XW2CIDOV.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DBIKNVMU.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-62KJGCGE.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2IFCBKOW.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2OEIBPXI.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KZR63QDG.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LMPIJOAE.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PECUCWUG.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WC7NMITX.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HXWX7IXK.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OHGMNQYM.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DTM3GEVP.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3M2MKHL7.js"
    ],
    "route": "/queries-v5t"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1128, hash: 'cf5cf8e29e92ce6b18c586f21eba7a69c92c35d0371493841e1db85265198d75', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1441, hash: '705c3f6359f5ee474106defa0d06290f7b262e817868a6a474147f5bb0bb9c75', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10693, hash: 'e740ccbf91ca557925c5fa404ccc1f67c6d5e46e64584376a7ef3eb3843e3dcc', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21799, hash: 'eb3eea070b1f55351acb4b2c7ec43d96271f61f5b6ac27e9a1e753abf20773ec', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 25917, hash: 'c59e90bec70d262790f453a539d14a946cfff6ad62af89d694886642e2d21cda', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15685, hash: '50678b4aad9541d23b649e7840d01e1d77fa332a0f82f2ddf8b2682345338ada', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12099, hash: 'a0d619542968a620ba116e430e6048d1c5cf4d59854093a40f73758add353bfb', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14616, hash: '4ceac7becb186ad4e45e8980407522845454f835b33843f710c7723f77690287', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21468, hash: '7a9e7285bb5f1a207477c228b504b5842835df9dc4d76bb34d309f5b1f289166', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12716, hash: 'bb7658778a900aad00b09dfccc4784fcf2152f3403ac41238689542a2766498f', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16546, hash: 'ed0ef5a8ac67e47902903152e62ae400ff3a513be20eb2e3f089df1d1e5a6034', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19531, hash: '8e724c97ddfadc48f0d1f8d154c5ccdc877b2beed56810c86f319aa1721d55e4', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14262, hash: 'a3168fced9f80fc7d9403d74ba2d49916858a0dbcb2cb16addbec51835501812', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15376, hash: '79b40b898233778a998d9e49c7eab29557d35ad2da0aa992a9e1f60797440253', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14422, hash: '8dd52d8a7bf186d667161d0ceb823f73a65cf7582194541662702bbc705019c0', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 10950, hash: 'da439fe3ae3b0ab9e6111ac49f606704f7dcfa76902a720eecc0cc5083fafa75', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10799, hash: 'be14d46ae6ea16e9a8379ca3750076626c82646594a0475e06f1b09facf7304a', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'styles-VXVM6HWE.css': {size: 76, hash: '94u4002xHfw', text: () => import('./assets-chunks/styles-VXVM6HWE_css.mjs').then(m => m.default)}
  },
};
