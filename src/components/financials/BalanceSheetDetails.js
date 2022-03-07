import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const BalanceSheetDetails = ({ entrydate, postingdate }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/account/balancesheetsummary?postingdate=${postingdate}`)
            .then(res => {
                setLoading(prevLoading => false);
                if (res.data === null) setResults(prevResults => []);
                else setResults(prevResults => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    }, [entrydate, postingdate]);

    let expenses = 0;
    let revenue = 0;

    let mainAccount = "";
    let subAccount = "";
    let tempSum = 0;
    let isFirst = true;

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Balance Sheet</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Main Account</th>
                            <th>Sub Account</th>
                            <th>Category</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            if (result.main_account === 'Expenses') {
                                expenses = expenses + parseFloat(result.amount);
                            } else if (result.main_account === 'Revenue' || result.main_account === 'Other Revenue') {
                                revenue = revenue + parseFloat(result.amount);
                            }

                            if (result.main_account === 'Revenue' || result.main_account === 'Other Revenue' || result.main_account === 'Expenses') {
                                return null;
                            } else {
                                if (mainAccount === result.main_account) {
                                    tempSum = tempSum + parseFloat(result.amount);
                                    if (subAccount === result.sub_account) {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>{result.account_category}</td>
                                                <td>{result.amount.toLocaleString()}</td>
                                            </tr>
                                        );
                                    } else {
                                        subAccount = result.sub_account;
                                        return (
                                            <tr>
                                                <td></td>
                                                <td><b>{result.sub_account}</b></td>
                                                <td>{result.account_category}</td>
                                                <td>{result.amount.toLocaleString()}</td>
                                            </tr>
                                        );
                                    }
                                } else {
                                    let printValue = tempSum;
                                    tempSum = 0;
                                    mainAccount = result.main_account;
                                    tempSum = tempSum + parseFloat(result.amount);

                                    if (isFirst) {
                                        isFirst = false;
                                        if (subAccount === result.sub_account) {
                                            return (
                                                <>
                                                    <tr>
                                                        <td><b>{result.main_account}</b></td>
                                                        <td></td>
                                                        <td>{result.account_category}</td>
                                                        <td>{result.amount.toLocaleString()}</td>
                                                    </tr>
                                                </>
                                            );
                                        } else {
                                            subAccount = result.sub_account;
                                            return (
                                                <>
                                                    <tr>
                                                        <td><b>{result.main_account}</b></td>
                                                        <td><b>{result.sub_account}</b></td>
                                                        <td>{result.account_category}</td>
                                                        <td>{result.amount.toLocaleString()}</td>
                                                    </tr>
                                                </>
                                            );
                                        }
                                    } else {
                                        if (subAccount === result.sub_account) {
                                            return (
                                                <>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><b>{printValue.toLocaleString()}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>{result.main_account}</b></td>
                                                        <td></td>
                                                        <td>{result.account_category}</td>
                                                        <td>{result.amount.toLocaleString()}</td>
                                                    </tr>
                                                </>
                                            );
                                        } else {
                                            subAccount = result.sub_account;
                                            return (
                                                <>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><b>{printValue.toLocaleString()}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>{result.main_account}</b></td>
                                                        <td><b>{result.sub_account}</b></td>
                                                        <td>{result.account_category}</td>
                                                        <td>{result.amount.toLocaleString()}</td>
                                                    </tr>
                                                </>
                                            );
                                        }
                                    }
                                }
                            }
                        })}
                        <tr>
                            <td><b>Retained Profit</b></td>
                            <td></td>
                            <td></td>
                            <td><b>{(Math.abs(revenue)-Math.abs(expenses)).toLocaleString()}</b></td>
                        </tr>
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};

export default BalanceSheetDetails;