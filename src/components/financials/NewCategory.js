import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Card, Spinner, Label, Row, Col, Form, Button, FormGroup, CardBody, UncontrolledAlert } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { getLoggedInUser } from '../../helpers/authUtils';
import FormInput from '../form/FormInput';
import { NUMBER_INPUT_REQUIRED, TEXTAREA_INPUT_REQUIRED, DROPDOWN_DEFAULT } from '../../constants/formValues';
import { loadDropdownAccountGeneric, loadDropdownAccountWithChildGeneric } from '../../helpers/form';

const NewCategory = () => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        main_account: DROPDOWN_DEFAULT,
        sub_account: DROPDOWN_DEFAULT,
        category_id: NUMBER_INPUT_REQUIRED,
        category_name: TEXTAREA_INPUT_REQUIRED,
    });

    useEffect(() => {
        loadDropdownAccountWithChildGeneric('main_account', 'main_account', 'sub_account', 'sub_account', 'main_account_id', 1, 1, setForm);
    }, [])

    const handleOnChange = e => {
        e.persist();
        if(e.target.name === 'main_account') {
            loadDropdownAccountGeneric('sub_account', 'sub_account', 'main_account_id', e.target.value, setForm);
        }
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
                '/account/category/new',
                qs.stringify({
                    sub_account_id: form.sub_account.value,
                    account_id: form.category_id.value,
                    name: form.category_name.value,
                    user_id: getLoggedInUser().id,
                })
            )
            .then(response => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'success', message: `Category created` });
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
                        Create Category
                    </Button>
                )}
            </>
        );
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">New Account Category</h4>
                <Row>
                    <Col>
                        
                                <Row>
                                    <Col md={12}>
                                        <Form onSubmit={handleFormSubmit}>
                                            <FormGroup>
                                                <Label for="text">Main Account</Label>
                                                <FormInput
                                                    {...form['main_account']}
                                                    name="main_account"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="text">Sub Account</Label>
                                                <FormInput
                                                    {...form['sub_account']}
                                                    name="sub_account"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['category_id']}
                                                    name="category_id"
                                                    placeholder="Category ID"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormInput
                                                    {...form['category_name']}
                                                    name="category_name"
                                                    placeholder="Category Name"
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                            <SubmitComponent />
                                        </Form>
                                    </Col>
                                </Row>
                       
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default NewCategory;