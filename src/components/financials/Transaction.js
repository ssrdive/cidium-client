import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

export default ({ id }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/transaction/${id}`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, [id]);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Transaction</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Account ID</th>
                            <th>Account Name</th>
                            <th>DR</th>
                            <th>CR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            return (
                                <tr key={index}>
                                    <td>{result.transaction_id}</td>
                                    <td>{result.account_id}</td>
                                    <Link to={'/financials/account/' + result.account_id2}><td>{result.account_name}</td></Link>
                                    <td>{result.type === 'DR' ? <>{'LKR'} {result.amount.toLocaleString()}</> : null}</td>
                                    <td>{result.type === 'CR' ? <>{'LKR'} {result.amount.toLocaleString()}</> : null}</td>
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
