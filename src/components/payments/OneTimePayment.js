import React from 'react';
import { Card, CardBody } from 'reactstrap';

export default ({ id, valid }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">One Time Payment</h4>
            </CardBody>
        </Card>
    );
};