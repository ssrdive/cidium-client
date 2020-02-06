import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import TrialBalance from '../../components/financials/TrialBalance';

export default () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Trial Balance', path: '#', active: true },
                        ]}
                        title={'Trial Balance'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <TrialBalance />
                </Col>
            </Row>
        </React.Fragment>
    );
};
