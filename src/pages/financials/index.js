import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import NewCategory from '../../components/financials/NewCategory';
import NewAccount from '../../components/financials/NewAccount';
import AccountTransaction from '../../components/financials/AccountTransaction';
import Account from '../../components/financials/Account';
import AccountReports from '../../components/financials/AccountReports';
import JournalEntryAudit from '../../components/financials/JournalEntryAudit';
import BalanceSheet from '../../components/financials/BalanceSheet';

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
                        <BalanceSheet history={history} />
                    </Col>
                </Col>
                <Col md={4}>
                    <NewAccount />
                </Col>
                <Col></Col>
            </Row>
        </React.Fragment>
    );
};

export default FinancialsPage;