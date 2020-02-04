import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import NewCategory from '../../components/financials/NewCategory';
import NewAccount from '../../components/financials/NewAccount';
import ChartOfAccounts from '../../components/financials/ChartOfAccounts';
import JournalEntry from '../../components/financials/JournalEntry';
import Account from '../../components/financials/Account';

export default ({history}) => {
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
                            <JournalEntry history={history} />
                        </Col>
                        <Col md={12}>
                            <Account history={history} />
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <NewCategory />
                </Col>
                <Col md={4}>
                    <NewAccount />
                </Col>
                <Col></Col>
            </Row>

            <Row>
                <Col>
                    <ChartOfAccounts />
                </Col>
            </Row>
        </React.Fragment>
    );
};
