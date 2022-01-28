import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const AccountLedger = ({ id }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/account/ledger/${id}`)
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

    let balance = 0;
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Account Ledger</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Account Name</th>
                            <th>Transaction ID</th>
                            <th>Posting Date</th>
                            <th>DR</th>
                            <th>CR</th>
                            <th>Balance</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            if(result.type === 'DR') {
                                balance = balance + parseFloat(result.amount);
                            } else {
                                balance = balance - parseFloat(result.amount);
                            }
                            return (
                                <tr key={index}>
                                    <td>{result.account_name}</td>
                                    <Link to={'/financials/transaction/' + result.transaction_id}><td>{result.transaction_id}</td></Link>
                                    <td>{result.posting_date}</td>
                                    <td>{result.type === 'DR' ? <>{'LKR'} {result.amount.toLocaleString()}</> : null}</td>
                                    <td>{result.type === 'CR' ? <>{'LKR'} {result.amount.toLocaleString()}</> : null}</td>
                                    <td><b>LKR {balance.toLocaleString()}</b></td>
                                    <td>{result.remark}</td>
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

export default AccountLedger;