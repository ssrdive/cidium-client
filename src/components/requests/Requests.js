import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';

import Request from './Request';

export default ({ requests, changeRequest }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Pending Requests</h4>
                <p className="sub-header">Following requests requires your approval</p>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Contract</th>
                            <th>Customer Name</th>
                            <th>State</th>
                            <th>Request State</th>
                            <th>Requested By</th>
                            <th>Requested On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => {
                            return <Request key={index} request={request} changeRequest={changeRequest} />;
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};