import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import qs from 'qs';
import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';

export default ({location}) => {
    const params = new URLSearchParams(location.search)
    const search = params.get("search")
    const state = params.get("state")
    const officer = params.get("officer")
    const batch = params.get("batch")

    useEffect(() => {
        apiAuth.get(`/contract/search/hello/${state}/${officer}/${batch}`).then(res => {}).catch(err => {});
    }, [])

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
