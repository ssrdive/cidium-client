import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Button, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import FormInput from '../form/FormInput';

import { loadOptionalDropdownGeneric } from '../../helpers/form';
import { getDate } from '../../helpers/date';

import { DROPDOWN_DEFAULT } from '../../constants/formValues';

export default ({ history }) => {
    const [form, setForm] = useState({
        recovery_officer: DROPDOWN_DEFAULT,
        start_date: { value: getDate('-') },
        end_date: { value: getDate('-') },
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    const setDate = (value, field) => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [field]: { ...prevForm[field] } };
            updatedForm[field].value = value;
            return updatedForm;
        });
    };

    useEffect(() => {
        loadOptionalDropdownGeneric('user', 'recovery_officer', 'Recovery Officer', setForm);
    }, []);

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        history.push(`/reporting/receiptsearch?officer=${form.recovery_officer.value}&startdate=${form.start_date.value}&enddate=${form.end_date.value}`)
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Receipt Search</h4>

                <Row>
                    <Col md={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <FormInput {...form['recovery_officer']} name="recovery_officer" handleOnChange={handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="text">Start Date</Label>
                                <Flatpickr
                                    value={form.start_date.value}
                                    onChange={(e, date) => {
                                        setDate(date, 'start_date');
                                    }}
                                    className="form-control"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="text">End Date</Label>
                                <Flatpickr
                                    value={form.end_date.value}
                                    onChange={(e, date) => {
                                        setDate(date, 'end_date');
                                    }}
                                    className="form-control"
                                />
                            </FormGroup>
                            <Button color="primary" type="submit">
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};
