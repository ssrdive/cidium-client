import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Button, CustomInput } from 'reactstrap';
import FormInput from '../form/FormInput';

import {
    loadDropdownConditionalGeneric,
    loadOptionalDropdownConditionalGeneric,
    loadOptionalDropdownGeneric
} from '../../helpers/form';

import { TEXT_INPUT_OPTIONAL, DROPDOWN_DEFAULT, NUMBER_INPUT_OPTIONAL } from '../../constants/formValues';

const RefaSearch = ({ history, searchType} ) => {
    const [form, setForm] = useState({
        search: TEXT_INPUT_OPTIONAL,
        state_id: DROPDOWN_DEFAULT,
        recovery_officer: DROPDOWN_DEFAULT,
        batch_id: DROPDOWN_DEFAULT,
        npl: { value: '', type: 'select', options: [{ id: '', name: 'Select Performing Status' }, { id: 0, name: 'Performing' }, { id: 1, name: 'Non-Performing' }] },
        external: { value: '', type: 'select', options: [{ id: '', name: 'Select Lead Type' }, { id: 0, name: 'Internal' }, { id: 1, name: 'External' }] },
        lkas17: { value: '', type: 'select', options: [{ id: '', name: 'Select LKAS 17 Status' }, { id: 1, name: 'LKAS 17 Compliant' }, { id: 0, name: 'LKAS 17 Non-compliant' }] },
        start_od: NUMBER_INPUT_OPTIONAL,
        end_od: NUMBER_INPUT_OPTIONAL,
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
        loadOptionalDropdownGeneric('state', 'state_id', 'State', setForm);
        loadOptionalDropdownConditionalGeneric('user', 'recovery_officer', 'Recovery Officer', 'filter_enabled', 1, setForm);
        loadOptionalDropdownGeneric('contract_batch', 'batch_id', 'Batch', setForm);
    }, []);

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        history.push(`/contracts/search?searchtype=${searchType}&search=${form.search.value}&state=${form.state_id.value}&officer=${form.recovery_officer.value}&batch=${form.batch_id.value}&npl=${form.npl.value}&lkas17=${form.lkas17.value}&external=${form.external.value}&legalcasestatus=${form.legal_case_status.value}&startod=${form.start_od.value}&endod=${form.end_od.value}`)
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Refa Search</h4>

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
                            {/*<FormGroup>*/}
                            {/*    <FormInput {...form['npl']} name="npl" handleOnChange={handleOnChange} />*/}
                            {/*</FormGroup>*/}
                            {/*<FormGroup>*/}
                            {/*    <FormInput {...form['lkas17']} name="lkas17" handleOnChange={handleOnChange} />*/}
                            {/*</FormGroup>*/}
                            {/*<FormGroup>*/}
                            {/*    <FormInput {...form['external']} name="external" handleOnChange={handleOnChange} />*/}
                            {/*</FormGroup>*/}
                            <FormGroup>
                                <FormInput {...form['legal_case_status']} name="legal_case_status" handleOnChange={handleOnChange} />
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormInput
                                            {...form['start_od']}
                                            name="start_od"
                                            placeholder="Start Od Index"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormInput
                                            {...form['end_od']}
                                            name="end_od"
                                            placeholder="End Od Index"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
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

export default RefaSearch;