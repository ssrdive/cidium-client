import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import ArchivedSearchPage from "../pages/archived/search";
import LegalSearchPage from "../pages/legal/search";
import HirePurchaseSearch from "../components/hire-purchase/HirePurchaseSearch";

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
const ContractCSQASearch = React.lazy(() => import('../pages/contracts/csqasearch'));
const ContractPerformanceReview = React.lazy(() => import('../pages/contracts/performancereview'));

const HirePurchase = React.lazy(() => import('../pages/hire-purchase'));
const HPSearch = React.lazy(() => import('../pages/hire-purchase/search'));

const Refa = React.lazy(() => import('../pages/refa'));

const MicroLoanAgreement = React.lazy(() => import('../pages/docgen/MicroLoanAgreement'));

const Micro = React.lazy(() => import('../pages/micro'));
const MicroSearch = React.lazy(() => import('../pages/micro/search'));

const Archived = React.lazy(() => import('../pages/archived'));
const ArchivedSearch = React.lazy(() => import('../pages/archived/search'));

const Legal = React.lazy(() => import('../pages/legal'));
const LegalSearch = React.lazy(() => import('../pages/legal/search'));

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
const FinancialsTransaction = React.lazy(() => import('../pages/financials/Transaction'));
const FinancialsEntryAudit = React.lazy(() => import('../pages/financials/JournalEntryAudit'));
const FinancialsBalanceSheet = React.lazy(() => import('../pages/financials/BalanceSheet'));
const FinancialsIncomeStatement = React.lazy(() => import('../pages/financials/IncomeStatement'));

const Reporting = React.lazy(() => import('../pages/reporting'));
const ReportingReceiptSearch = React.lazy(() => import('../pages/reporting/receiptsearch'));

// admin
const Admin = React.lazy(() => import('../pages/admin'));

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
    roles: ['Admin', 'Office Executive', 'Manager', 'Field Officer', 'Supplier', 'Level 3']
};

const loanApply = {
    path: '/apply',
    name: 'Apply',
    icon: FeatherIcon.Plus,
    component: Apply,
    route: PrivateRoute,
    roles: ['Admin', 'Supplier', 'Level 3']
}

// contracts
const contractsRoute = {
    path: '/contracts',
    name: 'Contracts',
    icon: FeatherIcon.FileMinus,
    component: Contracts,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
};

const hirePurchaseRoute = {
    path: '/hire-purchase',
    name: 'Hire Purchase',
    icon: FeatherIcon.FileText,
    component: HirePurchase,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
};

const hirePurchaseSubRoutes = [
    {
        path: '/hire-purchase/search',
        name: 'Hire Purchase Search',
        exact: true,
        component: HPSearch,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
]

const refaRoute = {
    path: '/refa',
    name: 'R E F A',
    icon: FeatherIcon.Briefcase,
    component: Refa,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
};

const microRoute = {
    path: '/micro',
    name: 'Micro Finance',
    icon: FeatherIcon.Minimize,
    component: Micro,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
};

const microSubRoutes = [
    {
        path: '/micro/search',
        name: 'Micro Search',
        exact: true,
        component: MicroSearch,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
]

const archivedRoute = {
    path: '/archived',
    name: 'Archived',
    icon: FeatherIcon.Archive,
    component: Archived,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
};

const archivedSubRoutes = [
    {
        path: '/archived/search',
        name: 'Archived Search',
        exact: true,
        component: ArchivedSearchPage,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
]

const legalRoute = {
    path: '/legal',
    name: 'Legal',
    icon: FeatherIcon.X,
    component: Legal,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
};

const legalSubRoutes = [
    {
        path: '/legal/search',
        name: 'Legal Search',
        exact: true,
        component: LegalSearchPage,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
]

const contractsSubRoutes = [
    {
        path: '/contracts/legacy',
        name: 'Legacy Contracts',
        exact: true,
        component: ContractsLegacy,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
    {
        path: '/contracts/search',
        name: 'Search',
        exact: true,
        component: ContractSearch,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
    {
        path: '/contracts/csqasearch',
        name: 'CSQA Search',
        exact: true,
        component: ContractCSQASearch,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
    {
        path: '/contracts/performancereview',
        name: 'Performance Review',
        exact: true,
        component: ContractPerformanceReview,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
    {
        path: '/contracts/work/:id',
        name: 'Work in Contract',
        exact: true,
        component: ContractWork,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
    {
        path: '/contracts/details/:id',
        name: 'Contract Details',
        exact: true,
        component: ContractDetails,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
];



const docGenSubRoutes = [
    {
        path: '/docgen/microloanagreement/:id',
        name: 'Micro Loan Agreement',
        exact: true,
        component: MicroLoanAgreement,
        route: PrivateRoute,
        roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
    },
]

// requests
const requestsRoute = {
    path: '/requests',
    name: 'Requests',
    icon: FeatherIcon.GitPullRequest,
    component: Requests,
    route: PrivateRoute,
    roles: ['Admin', 'Manager', 'Level 3']
};

// payments
const paymentsRoute = {
    path: '/payments',
    name: 'Payments',
    icon: FeatherIcon.DollarSign,
    component: Payments,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Level 3']
};

// loan-calculator
const loanCalculatorRoute = {
    path: '/loan-calculator',
    name: 'Loan Calculator',
    icon: FeatherIcon.Percent,
    component: LoanCalculator,
    route: PrivateRoute,
    roles: ['Admin', 'Office Executive', 'Manager', 'Field Officer', 'Level 3']
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
    {
        path: '/financials/transaction/:id',
        name: 'Transaction Details',
        exact: true,
        component: FinancialsTransaction,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/entryaudit',
        name: 'Journal Entry Audit',
        exact: true,
        component: FinancialsEntryAudit,
        route: PrivateRoute,
        roles: ['Admin', 'Manager']
    },
    {
        path: '/financials/balancesheet',
        name: 'Balance Sheet',
        exact: true,
        component: FinancialsBalanceSheet,
        route: PrivateRoute,
        roles: ['Admin']
    },
    {
        path: '/financials/incomestatement',
        name: 'Income Statement',
        exact: true,
        component: FinancialsIncomeStatement,
        route: PrivateRoute,
        roles: ['Admin']
    },
];

const reportingRoute = {
    path: '/reporting',
    name: 'Reporting',
    icon: FeatherIcon.FilePlus,
    component: Reporting,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin', 'Manager', 'Level 3']
};

const reportingSubRoutes = [
    {
        path: '/reporting/receiptsearch',
        name: 'Receipt Search',
        exact: true,
        component: ReportingReceiptSearch,
        route: PrivateRoute,
        roles: ['Admin', 'Manager', 'Level 3']
    },
]

// admin
const adminRoute = {
    path: '/admin',
    name: 'Admin',
    icon: FeatherIcon.Settings,
    component: Admin,
    exact: true,
    route: PrivateRoute,
    roles: ['Admin']
};

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
    hirePurchaseRoute,
    ...hirePurchaseSubRoutes,
    refaRoute,
    microRoute,
    legalRoute,
    ...legalSubRoutes,
    archivedRoute,
    ...archivedSubRoutes,
    ...docGenSubRoutes,
        ...microSubRoutes,
    requestsRoute,
    paymentsRoute,
    loanCalculatorRoute,
    financialsRoute,
    ...financialsSubRoutes,
    reportingRoute,
    ...reportingSubRoutes,
    adminRoute,
    authRoutes,
];

const authProtectedRoutes = [
    dashboardRoute,
    loanApply,
    contractsRoute,
    hirePurchaseRoute,
    refaRoute,
    microRoute,
    archivedRoute,
    legalRoute,
    requestsRoute,
    paymentsRoute,
    loanCalculatorRoute,
    financialsRoute,
    reportingRoute,
    adminRoute,
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
