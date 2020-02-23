import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

const Apply = React.lazy(() => import('../pages/apply'));

const Contracts = React.lazy(() => import('../pages/contracts'));
const ContractsLegacy = React.lazy(() => import('../pages/contracts/legacy'));
const ContractSearch = React.lazy(() => import('../pages/contracts/search'));
const ContractWork = React.lazy(() => import('../pages/contracts/work'));
const ContractDetails = React.lazy(() => import('../pages/contracts/details'));

const Requests = React.lazy(() => import('../pages/requests'));
const LoanCalculator = React.lazy(() => import('../pages/loan-calculator'));
const Payments = React.lazy(() => import('../pages/payments'));

const Financials = React.lazy(() => import('../pages/financials'));
const FinancialsJournalEntry = React.lazy(() => import('../pages/financials/JournalEntry'));
const FinancialsAccountLedger = React.lazy(() => import('../pages/financials/AccountLedger'));
const FinancialsChartOfAccounts = React.lazy(() => import('../pages/financials/ChartOfAccounts'));
const FinancialsTrialBalance = React.lazy(() => import('../pages/financials/TrialBalance'));
const FinancialsPaymentVoucher = React.lazy(() => import('../pages/financials/PaymentVoucher'));
const FinancialsPaymentVouchers = React.lazy(() => import('../pages/financials/PaymentVouchers'));
const FinancialsPaymentVoucherDetails = React.lazy(() => import('../pages/financials/PaymentVoucherDetails'));
const FinancialsDeposit = React.lazy(() => import('../pages/financials/Deposit'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// dashboard
const dashboardRoute = {
    path: '/dashboard',
    name: 'Dashboard',
    header: 'Navigation',
    icon: FeatherIcon.Home,
    component: Dashboard,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Field Officer', 'Supplier']
};

const loanApply = {
    path: '/apply',
    name: 'Apply',
    icon: FeatherIcon.Plus,
    component: Apply,
    route: PrivateRoute,
    roles: ['Admin', 'Supplier']
}

// contracts
const contractsRoute = {
    path: '/contracts',
    name: 'Contracts',
    icon: FeatherIcon.FileMinus,
    component: Contracts,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager']
};

const contractsSubRoutes = [
    {
        path: '/contracts/legacy',
        name: 'Legacy Contracts',
        exact: true,
        component: ContractsLegacy,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager']
    },
    {
        path: '/contracts/search',
        name: 'Search',
        exact: true,
        component: ContractSearch,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager']
    },
    {
        path: '/contracts/work/:id',
        name: 'Work in Contract',
        exact: true,
        component: ContractWork,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager']
    },
    {
        path: '/contracts/details/:id',
        name: 'Contract Details',
        exact: true,
        component: ContractDetails,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager']
    },
];

// requests
const requestsRoute = {
    path: '/requests',
    name: 'Requests',
    icon: FeatherIcon.GitPullRequest,
    component: Requests,
    route: PrivateRoute,
    roles: ['Admin', 'Manager']
};

// payments
const paymentsRoute = {
    path: '/payments',
    name: 'Payments',
    icon: FeatherIcon.DollarSign,
    component: Payments,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager']
};

// loan-calculator
const loanCalculatorRoute = {
    path: '/loan-calculator',
    name: 'Loan Calculator',
    icon: FeatherIcon.Percent,
    component: LoanCalculator,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Field Officer']
};

const financialsRoute = {
    path: '/financials',
    name: 'Financials',
    icon: FeatherIcon.BarChart2,
    component: Financials,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Manager']
};

const financialsSubRoutes = [
    {
        path: '/financials/journal-entry',
        name: 'Journal Entry',
        exact: true,
        component: FinancialsJournalEntry,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/account/:id',
        name: 'Account Ledger',
        exact: true,
        component: FinancialsAccountLedger,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/chart-of-accounts',
        name: 'Chart of Accounts',
        exact: true,
        component: FinancialsChartOfAccounts,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/trial-balance',
        name: 'Trial Balance',
        exact: true,
        component: FinancialsTrialBalance,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/payment-voucher',
        name: 'Payment Voucher',
        exact: true,
        component: FinancialsPaymentVoucher,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/payment-vouchers',
        name: 'Payment Vouchers',
        exact: true,
        component: FinancialsPaymentVouchers,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/payment-voucher/:id',
        name: 'Payment Voucher Details',
        exact: true,
        component: FinancialsPaymentVoucherDetails,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/deposit',
        name: 'Deposit',
        exact: true,
        component: FinancialsDeposit,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
];

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    dashboardRoute,
    loanApply,
    contractsRoute,
    ...contractsSubRoutes,
    requestsRoute,
    paymentsRoute,
    loanCalculatorRoute,
    financialsRoute,
    ...financialsSubRoutes,
    authRoutes,
];

const authProtectedRoutes = [
    dashboardRoute,
    loanApply,
    contractsRoute,
    requestsRoute,
    paymentsRoute,
    loanCalculatorRoute,
    financialsRoute,
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
