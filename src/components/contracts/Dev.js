import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';
import ReactJson from 'react-json-view'

import { apiAuth } from '../../cidium-api';

export default ({ id }) => {
    const [contractFinancialRaw, setContractFinancialRaw] = useState(null);

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
        fetchReceiptDetails();
    }, [id]);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Contract Financial</h4>

                {contractFinancialRaw !== null ? (
                    <ReactJson src={contractFinancialRaw} />
                ) : (
                        <Spinner type="grow" color="primary" />
                    )}

                <br></br>
            </CardBody>
        </Card>
    );
};
