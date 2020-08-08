import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import ReceiptSearchResults from '../../components/reporting/ReceiptSearchResults';

export default ({ location }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(location.search);
    const officer = params.get('officer');
    const startdate = params.get('startdate');
    const enddate = params.get('enddate');

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/reporting/receiptsearch?officer=${officer}&startdate=${startdate}&enddate=${enddate}`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, [startdate, enddate, officer]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Reporting', path: '/reporting' },
                            { label: 'Receipt Search', path: '/reporting', active: true },
                        ]}
                        title={'Receipt Search'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ReceiptSearchResults results={results} loading={loading} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
