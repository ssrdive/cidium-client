import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Card, Spinner, Label, Row, Col, Form, Button, FormGroup, CardBody, UncontrolledAlert } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { getLoggedInUser } from '../../helpers/authUtils';
import FormInput from '../form/FormInput';
import { NUMBER_INPUT_REQUIRED, TEXTAREA_INPUT_REQUIRED, DROPDOWN_DEFAULT } from '../../constants/formValues';
import { loadDropdownAccountGeneric } from '../../helpers/form';

export default () => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        account_category: DROPDOWN_DEFAULT,
        account_id: NUMBER_INPUT_REQUIRED,
        account_name: TEXTAREA_INPUT_REQUIRED,
    });

    useEffect(() => {
        loadDropdownAccountGeneric('account_category', 'account_category', 1, 1, setForm);
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
        apiAuth
            .post(
                '/account/new',
                qs.stringify({
                    account_category_id: form.account_category.value,
                    account_id: form.account_id.value,
                    name: form.account_name.value,
                    user_id: getLoggedInUser().id,
                })
            )
            .then(response => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'success', message: `Account created` });
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
                        Create Account
                    </Button>
                )}
            </>
        );
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">New Account</h4>
                <Row>
                    <Col>
                       
                            <>
                                <Row>
                                    <Col md={12}>
                                        <Form onSubmit={handleFormSubmit}>
                                            <FormGroup>
                                                <Label for="text">Account Category</Label>
                                                <FormInput
                                                    {...form['account_category']}
                                                    name="account_category"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['account_id']}
                                                    name="account_id"
                                                    placeholder="Account ID"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['account_name']}
                                                    name="account_name"
                                                    placeholder="Account Name"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <SubmitComponent />
                                        </Form>
                                    </Col>
                                </Row>
                            </>
                       
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};
