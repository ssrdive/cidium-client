import React, { useState } from 'react';
import qs from 'qs';
import { Card, Spinner, Row, Col, Form, Button, FormGroup, CardBody, UncontrolledAlert } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import FormInput from '../form/FormInput';
import { NUMBER_INPUT_REQUIRED } from '../../constants/formValues';

const SetDefaultAmountForm = ({ valid, id, onAfterSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        amount: NUMBER_INPUT_REQUIRED,
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    const handleFormSubmit = e => {
        setLoading(true);
        setSubmitStatus({ status: null, message: '' });
        e.preventDefault();
        if (!valid) return;
        apiAuth
            .post(
                '/contract/setdefault',
                qs.stringify({
                    contract_id: id,
                    amount: form.amount.value,
                })
            )
            .then(() => {
                setLoading(false);
                setSubmitStatus({ status: 'success', message: 'Default amount updated' });
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
                <h4 className="header-title mt-0">Set Default Amount</h4>
                <Row>
                    <Col>
                        {valid ? (
                            <Form onSubmit={handleFormSubmit}>
                                <FormGroup>
                                    <FormInput
                                        {...form['amount']}
                                        name="amount"
                                        placeholder="Amount"
                                        handleOnChange={handleOnChange}
                                        min={0}
                                    />
                                </FormGroup>
                                {submitStatus.status !== null ? (
                                    submitStatus.status === 'success' ? (
                                        <UncontrolledAlert color="success">{submitStatus.message}</UncontrolledAlert>
                                    ) : (
                                        <UncontrolledAlert color="warning">{submitStatus.message}</UncontrolledAlert>
                                    )
                                ) : null}
                                {loading ? (
                                    <Spinner className="m-2" type="grow" color="success" />
                                ) : (
                                    <Button color="success" type="submit">
                                        Update Default
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

export default SetDefaultAmountForm;


