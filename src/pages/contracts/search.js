import React, { useState, useEffect } from 'react';
import { Row, Badge, Col, Card, CardBody, Table } from 'reactstrap';
import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';

const SearchResults = ({ results }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Search Results</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount Pending</th>
                            <th>Total Payable</th>
                            <th>Recovery Officer</th>
                            <th>State</th>
                            <th>Model</th>
                            <th>Chassis Number</th>
                            <th>Customer Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            return (
                                <tr key={index}>
                                    <td>{result.id}</td>
                                    <td>
                                        {result.amount_pending > 0 ? (
                                            <Badge color="danger">{result.amount_pending.toLocaleString()}</Badge>
                                        ) : (
                                            <Badge color="success">{result.amount_pending.toLocaleString()}</Badge>
                                        )}
                                    </td>
                                    <td>
                                        {result.total_payable > 0 ? (
                                            <Badge color="warning">{result.total_payable.toLocaleString()}</Badge>
                                        ) : (
                                            <Badge color="success">{result.total_payable.toLocaleString()}</Badge>
                                        )}
                                    </td>
                                    <td>{result.recovery_officer}</td>
                                    <td>{result.state}</td>
                                    <td>{result.model}</td>
                                    <td>{result.chassis_number}</td>
                                    <td>{result.customer_name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default ({ location }) => {
    const [results, setResults] = useState([]);

    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const state = params.get('state');
    const officer = params.get('officer');
    const batch = params.get('batch');

    useEffect(() => {
        apiAuth
            .get(`/contract/search?search=${search}&state=${state}&officer=${officer}&batch=${batch}`)
            .then(res => {
                setResults(prevResults => res.data);
            })
            .catch(err => {
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
                    <SearchResults results={results} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
