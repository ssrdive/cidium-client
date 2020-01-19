import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import SearchResults from '../../components/contracts/SearchResults';

export default ({ location }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const state = params.get('state');
    const officer = params.get('officer');
    const batch = params.get('batch');

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/contract/search?search=${search}&state=${state}&officer=${officer}&batch=${batch}`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, [search, state, officer, batch]);

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
            <Row>
                <Col>
                    <SearchResults results={results} loading={loading} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
