import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import PaymentVouchers from '../../components/financials/PaymentVouchers';

export default props => {

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Payment Vouchers', path: '#', active: true },
                        ]}
                        title={'Payment Vouchers'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <PaymentVouchers />
                </Col>
            </Row>
        </React.Fragment>
    );
};
