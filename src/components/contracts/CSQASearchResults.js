import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Table, Spinner } from 'reactstrap';

const CSQASearchResults = ({ results, loading }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">CSQA Search Results</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Work</th>
                            <th>Details</th>
                            <th>Recovery Officer</th>
                            <th>State</th>
                            <th>Answer</th>
                            <th>Created Ago</th>
                            <th>State at Answer</th>
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
                                    <td>{result.recovery_officer}</td>
                                    <td>{result.state}</td>
                                    <td>
                                        {result.answer.Valid ? (
                                            <Badge color="info">{result.answer.String}</Badge>
                                        ) : (
                                                <Badge color="danger">-</Badge>
                                            )}
                                    </td>
                                    <td>
                                        {result.created_ago.Valid ? (
                                            <Badge color="info">{result.created_ago.Int32} days ago</Badge>
                                        ) : (
                                                <Badge color="danger">-</Badge>
                                            )}
                                    </td>
                                    <td>
                                        {result.state_at_answer.Valid ? (
                                            <Badge color="info">{result.state_at_answer.String}</Badge>
                                        ) : (
                                                <Badge color="danger">-</Badge>
                                            )}
                                    </td>
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

export default CSQASearchResults;