import React from 'react'
import { Card, Table, Row, Col, CardBody } from 'reactstrap';

export default ({ details, valid }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Contract Details</h4>
                <Row>
                    <Col md={12}>
                        {valid ? (
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Customer Name</td>
                                        <td>{details.customer_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Model</td>
                                        <td>{details.model_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Batch</td>
                                        <td>{details.contract_batch}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        ) : null}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};