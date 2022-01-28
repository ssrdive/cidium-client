import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';
import ReactJson from 'react-json-view'

import { apiAuth } from '../../cidium-api';

const Dev = ({ id }) => {
    const [contractFinancialRaw, setContractFinancialRaw] = useState(null);
    const [contractFinancialRaw2, setContractFinancialRaw2] = useState(null);

    useEffect(() => {
        const fetchReceiptDetails = () => {
            apiAuth
                .get(`/contract/detailfinancialraw/${id}`)
                .then(res => {
                    if (res.data === null) setContractFinancialRaw(prevReceipts => []);
                    else setContractFinancialRaw(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        const fetchReceiptDetails2 = () => {
            apiAuth
                .get(`/contract/detaillegacyfinancialraw/${id}`)
                .then(res => {
                    if (res.data === null) setContractFinancialRaw2(prevReceipts => []);
                    else setContractFinancialRaw2(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchReceiptDetails();
        fetchReceiptDetails2();
    }, [id]);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">LKAS 17 Compliant</h4>

                {/* eslint-disable-next-line */}
                {contractFinancialRaw !== null ? (
                    <ReactJson src={contractFinancialRaw} />
                ) : (
                        <Spinner type="grow" color="primary" />
                    )}

                <br></br>
                <h4 className="header-title mt-0">LKAS 17 Non-Compliant</h4>

                {/* eslint-disable-next-line */}
                {contractFinancialRaw2 !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Capital</th>
                            <th>Interest</th>
                            <th>Capital Paid</th>
                            <th>Interest Paid</th>
                            <th>Capital Payable</th>
                            <th>Interest Payable</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contractFinancialRaw2.map((financial, index) => {
                            return (
                                // eslint-disable-next-line
                                <tr key={index} style={{backgroundColor: (financial.capital_payable != 0 || financial.interest_payable != 0) && financial.due_in < 1 ? '#f7aba6' : ''}}>
                                    <td>{financial.installment_id}</td>
                                    <td>{financial.installment_type}</td>
                                    <td>{financial.capital}</td>
                                    <td>{financial.interest}</td>
                                    <td>{financial.capital_paid}</td>
                                    <td>{financial.interest_paid}</td>
                                    <td>{financial.capital_payable}</td>
                                    <td>{financial.interest_payable}</td>
                                    <td>{financial.due_date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                ) : (
                        <Spinner type="grow" color="primary" />
                    )}
            </CardBody>
        </Card>
    );
};

export default Dev;