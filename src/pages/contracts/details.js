import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import DetailsTabs from '../../components/contracts/DetailsTabs';

export default ({ match }) => {
    const id = match.params.id;

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'Details', path: '#', active: true },
                        ]}
                        title={'Contract Details'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <DetailsTabs id={id} />
                </Col>
            </Row>
        </>
    );
};
