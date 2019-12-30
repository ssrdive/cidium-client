import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import qs from 'qs';
import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';

export default ({location}) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'Work', path: '#', active: true },
                        ]}
                        title={'Work on Contract'}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};
