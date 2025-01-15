import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Button, CustomInput } from 'reactstrap';
import FormInput from '../form/FormInput';

import {
    loadOptionalDropdownConditionalGeneric,
    loadOptionalDropdownGeneric
} from '../../helpers/form';

import { TEXT_INPUT_OPTIONAL, DROPDOWN_DEFAULT } from '../../constants/formValues';

const MicroSearch = ({ history , selectSD, searchType} ) => {
    const [form, setForm] = useState({
        search: TEXT_INPUT_OPTIONAL,
        state_id: DROPDOWN_DEFAULT,
        recovery_officer: DROPDOWN_DEFAULT,
        batch_id: DROPDOWN_DEFAULT,
        recovery_status_id: DROPDOWN_DEFAULT,
        legal_case_status: { value: '', type: 'select', options: [{ id: '', name: 'Select Legal Case Status' }, { id: 1, name: 'Yes' }, { id: 0, name: 'No' }] },
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
        loadOptionalDropdownConditionalGeneric('state', 'state_id', 'State', 'contract_type_id', 2, setForm);
        loadOptionalDropdownConditionalGeneric('user', 'recovery_officer', 'Recovery Officer', 'filter_enabled', 1, setForm);
        loadOptionalDropdownGeneric('contract_batch', 'batch_id', 'Batch', setForm);
        loadOptionalDropdownGeneric('recovery_status', 'recovery_status_id', 'Recovery Status', setForm);
    }, []);

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        history.push(`/micro/search?searchtype=${searchType}&search=${form.search.value}&state=${form.state_id.value}&officer=${form.recovery_officer.value}&batch=${form.batch_id.value}&recoverystatus=${form.recovery_status_id.value}&legalcasestatus=${form.legal_case_status.value}`)
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Micro Search</h4>

                <Row>
                    <Col md={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <FormInput
                                    {...form['search']}
                                    name="search"
                                    placeholder="Search"
                                    handleOnChange={handleOnChange}
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
                                <FormInput {...form['recovery_status_id']} name="recovery_status_id" handleOnChange={handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <FormInput {...form['legal_case_status']} name="legal_case_status" handleOnChange={handleOnChange} />
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

export default MicroSearch;