import { Routes } from '@angular/router';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { HeroComponent } from './hero/hero.component';

export const routes: Routes = [
    {
        path: '',
        component: HeroComponent,
        title: 'home'
    },
    {
        path: 'transactions',
        component: TransactionListComponent,
        title: 'transactions'
    },
    {
        path: 'add-transaction',
        component: TransactionFormComponent,
        title: 'add-transaction'
    }
];
