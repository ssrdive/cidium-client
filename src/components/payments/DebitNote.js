import React from 'react';
import { Card, CardBody } from 'reactstrap';

export default ({ id, valid }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Debit Note</h4>
            </CardBody>
        </Card>
    );
};