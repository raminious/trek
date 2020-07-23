import { Load } from '@app/Loadable'

export const WebsitesPage = Load({
  loader: () => import('../pages/Sites') /* webpackChunkName: "sites_page" */
})

export const SessionsPage = Load({
  loader: () =>
    import('../pages/Sessions') /* webpackChunkName: "sessions_page" */
})

export const NotFoundPage = Load({
  loader: () =>
    import('../pages/NotFound') /* webpackChunkName: "notfound_page" */
})
