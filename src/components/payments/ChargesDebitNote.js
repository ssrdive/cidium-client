import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Card, Spinner, Label, Row, Col, Form, Button, FormGroup, CardBody, UncontrolledAlert } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { getLoggedInUser } from '../../helpers/authUtils';
import FormInput from '../form/FormInput';
import { NUMBER_INPUT_REQUIRED, TEXTAREA_INPUT_OPTIONAL, DROPDOWN_DEFAULT } from '../../constants/formValues';
import { loadDropdownConditionalGeneric } from '../../helpers/form';

export default ({ valid, id }) => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        debit_type: DROPDOWN_DEFAULT,
        amount: NUMBER_INPUT_REQUIRED,
        notes: TEXTAREA_INPUT_OPTIONAL,
    });

    useEffect(() => {
        loadDropdownConditionalGeneric('contract_installment_type', 'debit_type', 'di_chargable', 0, setForm);
    }, [])

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };
    const handleFormSubmit = e => {
        setLoading(prevLoading => true);
        setSubmitStatus({ status: null, message: '' });
        e.persist();
        e.preventDefault();
        if (!valid) return;
        apiAuth
            .post(
                '/contract/debitnote',
                qs.stringify({
                    contract_id: id,
                    capital: form.amount.value,
                    contract_installment_type_id: form.debit_type.value,
                    notes: form.notes.value,
                    user_id: getLoggedInUser().id,
                })
            )
            .then(response => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'success', message: `Debit note added with number ${response.data}` });
            })
            .catch(err => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'failure', message: 'Something went wrong' });
            });
    };

    const SubmitComponent = () => {
        return (
            <>
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
                        Issue
                    </Button>
                )}
            </>
        );
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Charges / Debit Note</h4>
                <Row>
                    <Col>
                        {valid ? (
                            <>
                                <Row>
                                    <Col md={12}>
                                        <Form onSubmit={handleFormSubmit}>
                                            <FormGroup>
                                                <Label for="text">Type</Label>
                                                <FormInput
                                                    {...form['debit_type']}
                                                    name="debit_type"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['amount']}
                                                    name="amount"
                                                    placeholder="Amount"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['notes']}
                                                    name="notes"
                                                    placeholder="Notes"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <SubmitComponent />
                                        </Form>
                                    </Col>
                                </Row>
                            </>
                        ) : null}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};
