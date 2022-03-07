import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import BalanceSheetDetails from '../../components/financials/BalanceSheetDetails';

const BalanceSheetPage = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const postingdate = params.get('postingdate');

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Balance Sheet', path: '#', active: true },
                        ]}
                        title={'Balance Sheet'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <BalanceSheetDetails postingdate={postingdate} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BalanceSheetPage;