import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

export default () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/account/chart`)
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
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Chart of Accounts</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Main Account ID</th>
                            <th>Name</th>
                            <th>Sub Account ID</th>
                            <th>Name</th>
                            <th>Category ID</th>
                            <th>Name</th>
                            <th>Account ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            return (
                                <tr key={index}>
                                    <td>{result.main_account_id}</td>
                                    <td>{result.main_account}</td>
                                    <td>{result.sub_account_id}</td>
                                    <td>{result.sub_account}</td>
                                    <td>{result.account_category_id.Int32}</td>
                                    <td>{result.account_category.String}</td>
                                    <td>{result.account_id.Int32}</td>
                                    <td>{result.account_name.String}</td>
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
