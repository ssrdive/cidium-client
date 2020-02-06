import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import ChartOfAccounts from '../../components/financials/ChartOfAccounts';

export default () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Chart of Accounts', path: '#', active: true },
                        ]}
                        title={'Chart of Accounts'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <ChartOfAccounts />
                </Col>
            </Row>
        </React.Fragment>
    );
};
