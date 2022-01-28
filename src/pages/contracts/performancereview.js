import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import PerformanceReviewResults from '../../components/contracts/PerformanceReviewResults';
import PerformanceReviewSummary from '../../components/contracts/PerformanceReviewSummary';
import PortfolioSummary from '../../components/contracts/PortfolioSummary';

const PerformanceReviewPage = ({ location }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(location.search);
    const startdate = params.get('startdate');
    const enddate = params.get('enddate');
    const state = params.get('state');
    const officer = params.get('officer');
    const batch = params.get('batch');
    const npl = params.get('npl');

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/contract/performancereview?startdate=${startdate}&enddate=${enddate}&state=${state}&officer=${officer}&batch=${batch}&npl=${npl}`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, [startdate, enddate, state, officer, batch, npl]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Contracts', path: '/contracts' },
                            { label: 'Performance Review', path: '/contracts/performancereview', active: true },
                        ]}
                        title={'Contract Performance Review'}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <PerformanceReviewSummary results={results} loading={loading} startdate={startdate} enddate={enddate} />
                </Col>
                <Col md={6}>
                    <PortfolioSummary results={results} loading={loading} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <PerformanceReviewResults results={results} loading={loading} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PerformanceReviewPage;