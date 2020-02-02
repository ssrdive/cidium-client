import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import NewCategory from '../../components/financials/NewCategory';
import NewAccount from '../../components/financials/NewAccount';
import ChartOfAccounts from '../../components/financials/ChartOfAccounts';

export default (props) => {
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
                <Col>
                    <NewCategory />
                </Col>
                <Col>
                    <NewAccount />
                </Col>
                <Col>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ChartOfAccounts />
                </Col>
            </Row>
        </React.Fragment>
    );
};
