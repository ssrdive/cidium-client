import React, { useState } from 'react';
import qs from 'qs';
import { Card, Spinner, Row, Col, Form, Button, FormGroup, CardBody, UncontrolledAlert, Input } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const HoldDefaultForm = ({ valid, id, onAfterSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [holdDefault, setHoldDefault] = useState('0');

    const handleFormSubmit = e => {
        setLoading(true);
        setSubmitStatus({ status: null, message: '' });
        e.preventDefault();
        if (!valid) return;
        apiAuth
            .post(
                '/contract/holddefault',
                qs.stringify({
                    contract_id: id,
                    hold_default: holdDefault,
                })
            )
            .then(() => {
                setLoading(false);
                setSubmitStatus({ 
                    status: 'success', 
                    message: `Hold default ${holdDefault === '1' ? 'enabled' : 'disabled'} successfully` 
                });
            })
            .catch(() => {
                setLoading(false);
                setSubmitStatus({ status: 'failure', message: 'Something went wrong' });
            })
            .finally(() => {
                if (onAfterSubmit) onAfterSubmit();
            });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Hold Default</h4>
                <Row>
                    <Col>
                        {valid ? (
                            <Form onSubmit={handleFormSubmit}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="hold_default"
                                        value={holdDefault}
                                        onChange={(e) => setHoldDefault(e.target.value)}
                                    >
                                        <option value="0">Disabled (0)</option>
                                        <option value="1">Enabled (1)</option>
                                    </Input>
                                </FormGroup>
                                {submitStatus.status !== null ? (
                                    submitStatus.status === 'success' ? (
                                        <UncontrolledAlert color="success">{submitStatus.message}</UncontrolledAlert>
                                    ) : (
                                        <UncontrolledAlert color="warning">{submitStatus.message}</UncontrolledAlert>
                                    )
                                ) : null}
                                {loading ? (
                                    <Spinner className="m-2" type="grow" color="warning" />
                                ) : (
                                    <Button color="warning" type="submit">
                                        Update Hold Default
                                    </Button>
                                )}
                            </Form>
                        ) : null}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default HoldDefaultForm;
