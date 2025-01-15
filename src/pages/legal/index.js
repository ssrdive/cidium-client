import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import LegalSearch from "../../components/legal/LegalSearch";

const LegalPage = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Legal', path: '/legal', active: true }]}
                        title={'Legal'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <LegalSearch {...props} selectSD={false} searchType={'legal'} />
                </Col>
                <Col md={8}>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default LegalPage;