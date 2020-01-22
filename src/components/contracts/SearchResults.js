import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Table, Spinner } from 'reactstrap';

export default ({ results, loading }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Search Results</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Work</th>
                            <th>Details</th>
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
                                    <td>
                                        <Link to={`/contracts/work/${result.id}`}>{result.id}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/contracts/details/${result.id}`}>{result.id}</Link>
                                    </td>
                                    <td>
                                        {result.amount_pending > 0 ? (
                                            <Badge color="danger">{result.amount_pending.toLocaleString()}</Badge>
                                        ) : (
                                            <Badge color="success">{result.amount_pending.toLocaleString()}</Badge>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/payments?id=${result.id}`}>
                                            {result.total_payable > 0 ? (
                                                <Badge color="warning">{result.total_payable.toLocaleString()}</Badge>
                                            ) : (
                                                <Badge color="success">{result.total_payable.toLocaleString()}</Badge>
                                            )}
                                        </Link>
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
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};