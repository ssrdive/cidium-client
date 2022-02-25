import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const JournalEntryAuditDetails = ({ entrydate, postingdate }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/account/journalentryaudit?entrydate=${entrydate}&postingdate=${postingdate}`)
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

    let isFirst = true;
    let currentIndex = 0;

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Journal Audit</h4>
                <Table className="mb-0" responsive={true}>
                    <thead>
                        <tr>
                            <th>Entry Date</th>
                            <th>Issuer</th>
                            <th>Txn</th>
                            <th>Account</th>
                            <th>Posting Date</th>
                            <th>DR</th>
                            <th>CR</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            // eslint-disable-next-line
                            if (currentIndex == result.transaction_id) {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{result.datetime}</td>
                                            <td>{result.issuer}</td>
                                            <td>{result.transaction_id}</td>
                                            <td>{result.account}</td>
                                            <td>{result.posting_date}</td>
                                            {/* eslint-disable-next-line */}
                                            <td>{result.type == 'DR' ? result.amount.toLocaleString() : ''}</td>
                                            {/* eslint-disable-next-line */}
                                            <td>{result.type == 'CR' ? result.amount.toLocaleString() : ''}</td>
                                            <td>{result.remark}</td>
                                        </tr>
                                    </>
                                );
                            } else {
                                currentIndex = result.transaction_id;
                                if (isFirst) {
                                    isFirst = false;
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{result.datetime}</td>
                                                <td>{result.issuer}</td>
                                                <td>{result.transaction_id}</td>
                                                <td>{result.account}</td>
                                                <td>{result.posting_date}</td>
                                                {/* eslint-disable-next-line */}
                                                <td>{result.type == 'DR' ? result.amount.toLocaleString() : ''}</td>
                                                {/* eslint-disable-next-line */}
                                                <td>{result.type == 'CR' ? result.amount.toLocaleString() : ''}</td>
                                                <td>{result.remark}</td>
                                            </tr>
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <tr bgcolor='#dad3e3'>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr key={index}>
                                                <td>{result.datetime}</td>
                                                <td>{result.issuer}</td>
                                                <td>{result.transaction_id}</td>
                                                <td>{result.account}</td>
                                                <td>{result.posting_date}</td>
                                                {/* eslint-disable-next-line */}
                                                <td>{result.type == 'DR' ? result.amount.toLocaleString() : ''}</td>
                                                {/* eslint-disable-next-line */}
                                                <td>{result.type == 'CR' ? result.amount.toLocaleString() : ''}</td>
                                                <td>{result.remark}</td>
                                            </tr>
                                        </>
                                    );
                                }
                            }
                        })}
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};

export default JournalEntryAuditDetails;