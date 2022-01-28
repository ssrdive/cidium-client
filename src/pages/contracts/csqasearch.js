import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import CSQASearchResults from '../../components/contracts/CSQASearchResults';

const CSQASearchPage = ({ location }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(location.search);
    const question = params.get('question');
    const empty = params.get('empty');
    const search = params.get('search');

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/contract/csqasearch?question=${question}&empty=${empty}&search=${search}`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, [question, empty, search]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'CSQA Search', path: '/contracts/search', active: true },
                        ]}
                        title={'Contract CSQA Search'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CSQASearchResults results={results} loading={loading} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CSQASearchPage;