import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import MicroSearch from "../../components/micro/MicroSearch";

const ContractsPage = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Micro Finance', path: '/micro', active: true }]}
                        title={'Micro Finance'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <MicroSearch {...props} selectSD={false} searchType={'micro'} />
                </Col>
                <Col md={8}>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ContractsPage;