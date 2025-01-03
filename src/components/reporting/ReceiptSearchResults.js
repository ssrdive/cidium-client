import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

const ReceiptSearchResults = ({ results, loading }) => {

    let total = 0;

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Receipt Search</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Receipt ID</th>
                            <th>Contract ID</th>
                            <th>Recovery Officer</th>
                            <th>Issuer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Notes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {results.map((result, index) => {
                            total = total + parseFloat(result.amount);
                            return (
                                <tr key={index}>
                                    <td>{result.id}</td>
                                    <td><Link to={'/contracts/details/' + result.contract_id}>{result.contract_id}</Link></td>
                                    <td>{result.officer}</td>
                                    <td>{result.issuer}</td>
                                    <td>{result.datetime}</td>
                                    <td>{result.amount.toLocaleString()}</td>
                                    <td>{result.notes.String}</td>
                                </tr>
                            );
                        })}

                        <tr>
                            <td><b>Total</b></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>{total.toLocaleString()}</b></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};

export default ReceiptSearchResults;