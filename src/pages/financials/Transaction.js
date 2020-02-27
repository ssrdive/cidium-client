import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import Transaction from '../../components/financials/Transaction';

export default ({ history, match }) => {
    const id = match.params.id;

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Transaction', path: '#', active: true },
                        ]}
                        title={'Transaction'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Transaction id={id} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
