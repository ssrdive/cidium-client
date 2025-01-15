import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import HirePurchaseSearch from "../../components/hire-purchase/HirePurchaseSearch";

const HirePurchasePage = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Hire Purchase', path: '/hire-purchase', active: true }]}
                        title={'Hire Purchase'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <HirePurchaseSearch {...props} selectSD={false} searchType={'hp'} />
                </Col>
                <Col md={8}>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default HirePurchasePage;