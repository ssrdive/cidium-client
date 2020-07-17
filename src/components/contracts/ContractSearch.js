import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Button, CustomInput } from 'reactstrap';
import FormInput from '../form/FormInput';

import { loadOptionalDropdownGeneric } from '../../helpers/form';

import { TEXT_INPUT_OPTIONAL, DROPDOWN_DEFAULT } from '../../constants/formValues';

export default ({ history }) => {
    const [form, setForm] = useState({
        search: TEXT_INPUT_OPTIONAL,
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
        history.push(`/contracts/search?search=${form.search.value}&state=${form.state_id.value}&officer=${form.recovery_officer.value}&batch=${form.batch_id.value}&npl=${form.npl.value}`)
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Search</h4>

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
                                <FormInput {...form['npl']} name="npl" handleOnChange={handleOnChange} />
                            </FormGroup>
                            {/* <FormGroup>
                                <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Hide non-performing loans" onChange={e => {
                                    setForm(prevForm => {
                                        const updatedForm = { ...prevForm };
                                        updatedForm.hidenpl = prevForm.hidenpl === 0 ? 1 : 0;
                                        return updatedForm;
                                    })
                                }} />
                            </FormGroup> */}
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
