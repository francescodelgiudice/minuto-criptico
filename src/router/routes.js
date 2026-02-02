const routes = [
  {
    path: '/',
    meta: { back: false },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/clues/:index',
    meta: { back: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/CluePage.vue') }],
  },
  {
    path: '/about',
    meta: { back: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
