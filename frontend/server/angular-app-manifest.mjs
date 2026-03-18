
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
      "chunk-65R7HL5Y.js"
    ],
    "route": "/reset-init-7a2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JF7LOZHS.js"
    ],
    "route": "/v-secure-9b1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-44BX4BSM.js"
    ],
    "route": "/upd-cred-3f4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YZN7OFHC.js"
    ],
    "route": "/reg-new-8d2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-R7EAEO6X.js"
    ],
    "route": "/root-home-v2b"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-45UJC3D2.js"
    ],
    "route": "/edit-profile-v7y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-M46GGAIN.js"
    ],
    "route": "/secure-upd-v4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HNJBW7II.js"
    ],
    "route": "/new-domain-v8x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FSCVWJXB.js"
    ],
    "route": "/domain-explorer-v9z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VUXP2K77.js"
    ],
    "route": "/view-domain-k2m"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YMAXFGLU.js"
    ],
    "route": "/reg-iam-f3n"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-L7U5UIK6.js"
    ],
    "route": "/view-iam-z5x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PJV23TM2.js"
    ],
    "route": "/edit-iam-c4k"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VEUFMOJL.js"
    ],
    "route": "/queries-v5t"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-O45MU6ZG.js"
    ],
    "route": "/post-announcement-v2x"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-H5DMMPEE.js"
    ],
    "route": "/create-announcement-n3y"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MLL6N55M.js"
    ],
    "route": "/edit-announcement-m5z"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DVA3BOH6.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1323, hash: '2a076fb81a5880aa6e6984984299e095b02f2e25b13ead1aac503f8e97820243', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1538, hash: '42b0be70caef9ee064c6c5a6fbb3c443d055110af74c96e2dd3f5155dafe68e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21994, hash: 'd758ef37b1bb812ab0f02ab3e66d99da6fa7016d9ca210ab973b2d515b273c2d', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10888, hash: 'd1aae35dc65955af65162819e44aba2c1ee33f8a4c2a54a8cdfdd4eb4e61c384', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12294, hash: 'c91f9308799fe953284f017bc9e1510fb57f07e3daec4f1e88cff7aa19efc450', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 26112, hash: '70ac894864945f68578c303634f8852e51acfe94c7ce6acd3b2074cd9aa34b4f', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21659, hash: '765417dc14528f5dc1a7b1c79465a665de9b629995834335f10c4485539deb42', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14811, hash: 'a17ce9d4d16475c7d8a2907377c9e191c605ac9b681dc21b4fc203ef08d99912', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15880, hash: 'd29a8e667313afc55db403844209bc95d8c8c9b40b03bb6f0a8cdc0ad99dc1b7', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16369, hash: '6ef3f073a19ee0350f3c176952567d4fb057d69202a2b84d6ac461e37ad39160', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14460, hash: '446d767dff1852e8040b3e308443ce815bd46a643fc8be9d5025c9bc05d5eefd', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12909, hash: 'a95e847adb1df042495e00775e7b6e3f506b894284ac8e2d2210c793631c1ad3', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 105095, hash: '299012cefa97b21317ffa9ada0541f40dc5d3ab7078b7abe1d51603d5f003357', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16745, hash: '35d5a5499cfaaee6c0cbcf18af9876848defd4db9e67751ad225e2ab4fe8b259', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19726, hash: '3f3be354c65479f2f08e90288b71d5759b058d25ba72af96247c6ceeaa65fb1f', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23608, hash: '4987fcf1f362bc9122bc6e7faf25ae71098f34b596fdb7db68cdbedef98f6eff', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14617, hash: '95295d6a3f4e05499ad2d403bf2acbdaa5d9abf0020f768f628e3880b5d2a4e2', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15573, hash: '48193c93dd8540c599815936e62a94f66becd560ddf16ab6c129af7b12b044ab', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10994, hash: '868c7fe887c1325dd67a948f0c68702f280c349a9468e4394f44cf877b88fbd4', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25462, hash: '9123fac6d0e574779d9ab14f3802775ec470db13fb7b18460786b4ce53a0e237', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 11145, hash: '435505dab3a1f6362c5dfcd61d3b34e23978a96f6089e6d8bddae42cb01e57bd', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'styles-DYHGH45A.css': {size: 414, hash: 'lV9mD6i2Kkc', text: () => import('./assets-chunks/styles-DYHGH45A_css.mjs').then(m => m.default)}
  },
};
