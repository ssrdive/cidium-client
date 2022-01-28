import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import NewContract from '../../components/contracts/NewContract';

const ApplyPage = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Apply', path: '/apply', active: true }]}
                        title={'Apply'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <NewContract history={props.history} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ApplyPage;