import React, { useState, useEffect } from 'react';
import { Card, Label, Row, Col, Form, Button, FormGroup, CardBody } from 'reactstrap';

import FormInput from '../form/FormInput';
import { DROPDOWN_DEFAULT } from '../../constants/formValues';
import { loadDropdownAccountGeneric } from '../../helpers/form';

export default ({ history }) => {
    const [form, setForm] = useState({
        account: DROPDOWN_DEFAULT,
    });

    useEffect(() => {
        loadDropdownAccountGeneric('account', 'account', 1, 1, setForm);
    }, []);

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Account Ledger</h4>
                <Row>
                    <Col>
                        <>
                            <Row>
                                <Col md={12}>
                                    <Form>
                                        <FormGroup>
                                            <Label for="text">Account</Label>
                                            <FormInput
                                                {...form['account']}
                                                name="account"
                                                handleOnChange={handleOnChange}
                                            />
                                        </FormGroup>
                                        <Button
                                            color="info"
                                            onClick={() => {
                                                history.push(`/financials/account/${form.account.value}`);
                                            }}>
                                            View
                                        </Button>
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
