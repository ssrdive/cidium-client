import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const TrialBalanceDetails = ({ postingdate }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/account/trialbalance?postingdate=${postingdate}`)
            .then(res => {
                console.log(res);
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
    let debitAccounts = ['Assets', 'Expenses', 'Cost of Sales'];

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Trial Balance</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Main Account</th>
                            <th>Sub Account</th>
                            <th>Account Category</th>
                            <th>Account ID</th>
                            <th>Name</th>
                            <th style={{textAlign: "right"}}>Debit</th>
                            <th style={{textAlign: "right"}}>Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            debits = parseFloat(debits) + result.debit;
                            credits = parseFloat(credits) + result.credit;
                            if (result.balance !== 0) {
                                return (
                                    <tr key={index}>
                                        <td>{result.main_account}</td>
                                        <td>{result.sub_account}</td>
                                        <td>{result.account_category}</td>
                                        <td>{result.account_id}</td>
                                        <td>
                                            <Link to={`/financials/account/${result.id}`}>{result.account_name}</Link>
                                        </td>
                                        {
                                            debitAccounts.includes(result.main_account) ?
                                                <>
                                                    <td style={{textAlign: "right"}}>{parseFloat(result.debit.toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                                    <td></td>
                                                </> :
                                                <>
                                                    <td></td>
                                                    <td style={{textAlign: "right"}}>{parseFloat(result.credit.toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                                </>
                                        }
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        })}
                        <tr>
                            <td><b>Balance</b></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{textAlign: "right"}}><b>{parseFloat(debits.toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: 2})}</b></td>
                            <td style={{textAlign: "right"}}><b>{parseFloat(credits.toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: 2})}</b></td>
                        </tr>
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};

export default TrialBalanceDetails;