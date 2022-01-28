import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Button, Label } from 'reactstrap';
import FormInput from '../form/FormInput';
import Flatpickr from 'react-flatpickr';

import { loadOptionalDropdownGeneric } from '../../helpers/form';
import { getDate } from '../../helpers/date';

import { DROPDOWN_DEFAULT } from '../../constants/formValues';

const ContractPerformanceReview = ({ history }) => {
    const [form, setForm] = useState({
        start_date: { value: getDate('-') },
        end_date: { value: getDate('-') },
        state_id: DROPDOWN_DEFAULT,
        recovery_officer: DROPDOWN_DEFAULT,
        batch_id: DROPDOWN_DEFAULT,
        npl: { value: '', type: 'select', options: [{ id: '', name: 'Select Performing Status' }, { id: 0, name: 'Performing' }, { id: 1, name: 'Non-Performing' }] },
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    useEffect(() => {
        loadOptionalDropdownGeneric('state', 'state_id', 'State', setForm);
        loadOptionalDropdownGeneric('user', 'recovery_officer', 'Recovery Officer', setForm);
        loadOptionalDropdownGeneric('contract_batch', 'batch_id', 'Batch', setForm);
    }, []);

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        history.push(`/contracts/performancereview?startdate=${form.start_date.value}&enddate=${form.end_date.value}&state=${form.state_id.value}&officer=${form.recovery_officer.value}&batch=${form.batch_id.value}&npl=${form.npl.value}`)
    }

    const setDate = (value, field) => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [field]: { ...prevForm[field] } };
            updatedForm[field].value = value;
            return updatedForm;
        });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Contract Performance Review</h4>

                <Row>
                    <Col md={12}>
                        <Form onSubmit={handleFormSubmit}>
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
                            <FormGroup>
                                <FormInput {...form['state_id']} name="state_id" handleOnChange={handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <FormInput {...form['recovery_officer']} name="recovery_officer" handleOnChange={handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <FormInput {...form['batch_id']} name="batch_id" handleOnChange={handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <FormInput {...form['npl']} name="npl" handleOnChange={handleOnChange} />
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

export default ContractPerformanceReview;