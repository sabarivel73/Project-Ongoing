
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
      "chunk-FS3IQ5YR.js"
    ],
    "route": "/iam-user-home-v1x"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1226, hash: 'b22160780ed86ce2377902bc24e005283baa871849e7c216f9fdc8ece503781f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1441, hash: '2b5492375b08ae6f3b9829a678f0f1b39f85f60d286e17870e5fe19eaec28ef5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'root-home-v2b/index.html': {size: 21897, hash: 'f687c0252910def2d8cbcd41ae6e2fb03e1eacea64e039340f3749b412031c51', text: () => import('./assets-chunks/root-home-v2b_index_html.mjs').then(m => m.default)},
    'edit-profile-v7y/index.html': {size: 12197, hash: '8bc9a76ddbc0ec96f7765794a0208aa45f4eb9703bc27800b8ae75ff4f701da4', text: () => import('./assets-chunks/edit-profile-v7y_index_html.mjs').then(m => m.default)},
    'view-domain-k2m/index.html': {size: 26015, hash: '854d79c7c520bf677b2173c592fb6c3c72f0d2e5b0fdec371f2475a8125fdf81', text: () => import('./assets-chunks/view-domain-k2m_index_html.mjs').then(m => m.default)},
    'view-iam-z5x/index.html': {size: 14714, hash: '6deffb2613de799dced2fc9d3125c0ab7147301a64f122486946ffdd759c0c60', text: () => import('./assets-chunks/view-iam-z5x_index_html.mjs').then(m => m.default)},
    'auth-v1/index.html': {size: 15783, hash: 'c7c8a431fa2839f7fa379d4960387e251a8cfda806271fa2e465f29ea0cb900f', text: () => import('./assets-chunks/auth-v1_index_html.mjs').then(m => m.default)},
    'queries-v5t/index.html': {size: 21563, hash: 'b8ddb8e1b91471009bc282dbda94d00678b8a009e95dc16a10349f6b536f611d', text: () => import('./assets-chunks/queries-v5t_index_html.mjs').then(m => m.default)},
    'create-announcement-n3y/index.html': {size: 16275, hash: 'ad241f5c9cb91d76e81a4d918e688e140e1e2a38916b2541e835b5b4983044d8', text: () => import('./assets-chunks/create-announcement-n3y_index_html.mjs').then(m => m.default)},
    'reset-init-7a2/index.html': {size: 10791, hash: '7285f05fb4557a4de8c48a4aa82d203701af82e65ed845a004792ea19f63b7ed', text: () => import('./assets-chunks/reset-init-7a2_index_html.mjs').then(m => m.default)},
    'upd-cred-3f4/index.html': {size: 12815, hash: '06ec306f32092b711907b1f1d833efe2a1dd8c0e100ea54712cf9e5220ee66c8', text: () => import('./assets-chunks/upd-cred-3f4_index_html.mjs').then(m => m.default)},
    'secure-upd-v4k/index.html': {size: 14364, hash: '4b8bb6443ad8e2a0db4475a540720e13eb0bddaee76e407cec8b679ad384414b', text: () => import('./assets-chunks/secure-upd-v4k_index_html.mjs').then(m => m.default)},
    'domain-explorer-v9z/index.html': {size: 16644, hash: '71efdd93cd6d1369bb0d41f520883b5037dd411f3cb34d253121dc37549b3891', text: () => import('./assets-chunks/domain-explorer-v9z_index_html.mjs').then(m => m.default)},
    'iam-user-home-v1x/index.html': {size: 102048, hash: 'b1168d96dc00ad7a64d5434d990b32d3691e3bc602c296c8bfa8febdd4ea6e0c', text: () => import('./assets-chunks/iam-user-home-v1x_index_html.mjs').then(m => m.default)},
    'edit-iam-c4k/index.html': {size: 19629, hash: '0dd430ddcc74d91d3cd5bae788f0b2eab16637bad09e80fdf9cf08ee8604ab6d', text: () => import('./assets-chunks/edit-iam-c4k_index_html.mjs').then(m => m.default)},
    'edit-announcement-m5z/index.html': {size: 23511, hash: 'ef8b90aede2d9b2510e15cfffe41672195cac23222e3b1346d57621456be539a', text: () => import('./assets-chunks/edit-announcement-m5z_index_html.mjs').then(m => m.default)},
    'reg-new-8d2/index.html': {size: 14517, hash: '183e5f622dcd2704f7ac9f983ae8c9b88ef83f42be949e1ac4b361f84ffdd799', text: () => import('./assets-chunks/reg-new-8d2_index_html.mjs').then(m => m.default)},
    'reg-iam-f3n/index.html': {size: 15476, hash: '61332d87436a4db20a9662a628f55535604e8f70d12104cbcf338203a849d919', text: () => import('./assets-chunks/reg-iam-f3n_index_html.mjs').then(m => m.default)},
    'v-secure-9b1/index.html': {size: 10897, hash: 'a0de7433d14d534180b19d901bd9a97e8932d33526cbac270adf821261c4f251', text: () => import('./assets-chunks/v-secure-9b1_index_html.mjs').then(m => m.default)},
    'post-announcement-v2x/index.html': {size: 25365, hash: '02f45086ce7505d0a997916f56fc81a87b7453d7a7e1d36cfa58024aebbd3af1', text: () => import('./assets-chunks/post-announcement-v2x_index_html.mjs').then(m => m.default)},
    'new-domain-v8x/index.html': {size: 11048, hash: 'e47e2eedbae7c0ed6dbac0b2e5085660b5b37dbc25c711b6bb0b78fb30e2eb5c', text: () => import('./assets-chunks/new-domain-v8x_index_html.mjs').then(m => m.default)},
    'styles-DYHGH45A.css': {size: 414, hash: 'lV9mD6i2Kkc', text: () => import('./assets-chunks/styles-DYHGH45A_css.mjs').then(m => m.default)}
  },
};
