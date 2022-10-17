import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import TrialBalanceDetails from '../../components/financials/TrialBalanceDetails';

const TrialBalancePage = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const postingdate = params.get('postingdate');

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
                    <TrialBalanceDetails postingdate={postingdate} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default TrialBalancePage;
