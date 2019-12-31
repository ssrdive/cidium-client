import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

export default ({location}) => {
    const params = new URLSearchParams(location.search)
    const search = params.get("search")
    const state_id = params.get("state_id")
    const recovery_officer = params.get("recovery_officer")
    const batch_id = params.get("batch_id")

    console.log(search, state_id, recovery_officer, batch_id)
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'Search', path: '/contracts/search', active: true },
                        ]}
                        title={'Contract Search'}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};
