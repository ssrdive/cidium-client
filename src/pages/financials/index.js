import React from 'react';
import { Row, Col } from 'reactstrap';

import { getLoggedInUser } from '../../helpers/authUtils';

import PageTitle from '../../components/PageTitle';
import NewCategory from '../../components/financials/NewCategory';
import NewAccount from '../../components/financials/NewAccount';
import AccountTransaction from '../../components/financials/AccountTransaction';
import Account from '../../components/financials/Account';
import AccountReports from '../../components/financials/AccountReports';
import JournalEntryAudit from '../../components/financials/JournalEntryAudit';
import BalanceSheet from '../../components/financials/BalanceSheet';
import IncomeStatement from '../../components/financials/IncomeStatement';

const FinancialsPage = ({ history }) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Financials', path: '/financials', active: true }]}
                        title={'Financials'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Row md={12}>
                        <Col md={12}>
                            <AccountTransaction history={history} />
                        </Col>
                        <Col md={12}>
                            <AccountReports history={history} />
                        </Col>
                        <Col md={12}>
                            <Account history={history} />
                        </Col>
                        <Col md={12}>
                            <JournalEntryAudit history={history} />
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <Col md={12}>
                        <NewCategory />
                    </Col>
                    <Col md={12}>
                        {getLoggedInUser().role === 'Admin' ? <BalanceSheet history={history} /> : null}
                    </Col>
                </Col>
                <Col md={4}>
                    <Col md={12}>
                        <NewAccount />
                    </Col>
                    <Col md={12}>
                        {getLoggedInUser().role === 'Admin' ? <IncomeStatement history={history} /> : null}
                    </Col>
                </Col>
                <Col></Col>
            </Row>
        </React.Fragment>
    );
};

export default FinancialsPage;