import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import AccountLedger from '../../components/financials/AccountLedger';

const AccountLedgerPage = ({ history, match }) => {
    const id = match.params.id;

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Account Ledger', path: '#', active: true },
                        ]}
                        title={'Account Ledger'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <AccountLedger id={id} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default AccountLedgerPage;