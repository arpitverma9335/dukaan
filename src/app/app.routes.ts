import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'products',
        canActivate: [() => {
            const router = inject(Router);
            const token = localStorage.getItem('token');
            return !!token ? true : router.parseUrl('/login');
        }], // Simple auth guard
        loadComponent: () => import('./pages/catalogue/catalogue.component').then(m => m.CatalogueComponent)
    },
    {
        path: 'cart',
        canActivate: [() => {
            const router = inject(Router);
            const token = localStorage.getItem('token');
            return !!token ? true : router.parseUrl('/login');
        }], // Simple auth guard
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'orders',
        canActivate: [() => {
            const router = inject(Router);
            const token = localStorage.getItem('token');
            return !!token ? true : router.parseUrl('/login');
        }], // Simple auth guard
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/orders/order/order.component').then(m => m.OrderComponent)
            }
        ]
    },
    {
        path: 'profile',
        canActivate: [() => {
            const router = inject(Router);
            const token = localStorage.getItem('token');
            return !!token ? true : router.parseUrl('/login');
        }], // Simple auth guard
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
