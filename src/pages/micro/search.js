import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import SearchResults from '../../components/micro/SearchResults';
import SearchSummary from '../../components/contracts/SearchSummary';
import ArrearsSummary from '../../components/contracts/ArrearsSummary';

const MicroSearchPage = ({ location }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(location.search);
    const searchType = params.get('searchtype');
    const search = params.get('search');
    const state = params.get('state');
    const officer = params.get('officer');
    const batch = params.get('batch');
    const recoverystatus = params.get('recoverystatus');
    const legalcasestatus = params.get('legalcasestatus');

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/contract/lkas17searchv2?searchtype=${searchType}&search=${search}&state=${state}&officer=${officer}&batch=${batch}&recoverystatus=${recoverystatus}&legalcasestatus=${legalcasestatus}`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, [searchType, search, state, officer, batch, recoverystatus]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Micro', path: '/micro' },
                            { label: 'Search', path: '/micro/search', active: true },
                        ]}
                        title={'Micro Search'}
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

export default MicroSearchPage;