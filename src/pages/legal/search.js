import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import SearchResults from '../../components/contracts/SearchResults';
import SearchSummary from '../../components/contracts/SearchSummary';
import ArrearsSummary from '../../components/contracts/ArrearsSummary';

const LegalSearchPage = ({ location }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const state = params.get('state');
    const officer = params.get('officer');
    const batch = params.get('batch');
    const npl = params.get('npl');
    const lkas17 = params.get('lkas17');
    const external = params.get('external');
    const startod = params.get('startod');
    const endod = params.get('endod');
    const removedeleted = params.get('removedeleted');
    const searchType = params.get('searchtype');
    const legalcasestatus = params.get('legalcasestatus');

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/contract/searchv2?searchtype=${searchType}&search=${search}&state=${state}&officer=${officer}&batch=${batch}&npl=${npl}&lkas17=${lkas17}&external=${external}&startod=${startod}&endod=${endod}&removedeleted=${removedeleted}&legalcasestatus=${legalcasestatus}`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, [search, state, officer, batch, npl, endod, external, lkas17, removedeleted, startod]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Legal', path: '/legal' },
                            { label: 'Search', path: '/legal/search', active: true },
                        ]}
                        title={'Contract Search'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SearchSummary results={results} loading={loading} />
                </Col>
                <Col>
                    <ArrearsSummary results={results} loading={loading} />
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

export default LegalSearchPage;