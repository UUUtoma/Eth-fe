import React, { lazy } from 'react';

const routerMap = [
  {
    path: '/',
    component: lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home')),
  },
  {
    path: '/detail',
    component: lazy(() => import(/* webpackChunkName: "detail" */ '@/pages/detail')),
  }
];

export default routerMap;