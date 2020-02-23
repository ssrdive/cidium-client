import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

export default () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/account/trialbalance`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, []);

    let debits = 0;
    let credits = 0;
    let balance = 0;

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Trial Balance</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Account ID</th>
                            <th>Name</th>
                            {/* <th>Debit</th>
                            <th>Credit</th> */}
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            balance = balance + result.balance;
                            debits = debits + result.debit;
                            credits = credits + result.credit;
                            if (result.balance !== 0) {
                                return (
                                    <tr key={index}>
                                        <td>{result.account_id}</td>
                                        <td>
                                            <Link to={`/financials/account/${result.id}`}>{result.account_name}</Link>
                                        </td>
                                        {/* <td>LKR {result.debit.toLocaleString()}</td> */}
                                        {/* <td>LKR {result.credit.toLocaleString()}</td> */}
                                        <td>
                                            <b>LKR {result.balance.toLocaleString()}</b>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        })}
                        <tr>
                            <td>
                                <b>Balance</b>
                            </td>
                            <td></td>
                            {/* <td><b>LKR {debits.toLocaleString()}</b></td> */}
                            {/* <td><b>LKR {credits.toLocaleString()}</b></td> */}
                            <td>
                                <b>LKR {balance.toLocaleString()}</b>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};
