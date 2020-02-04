import React, { useState } from 'react';
import qs from 'qs';
import { Row, Col, Card, CardBody, Button, Label, FormGroup, Spinner, UncontrolledAlert } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

import FormInput from '../../components/form/FormInput';

import PageTitle from '../../components/PageTitle';
import Entry from '../../components/financials/Entry';
import { getLoggedInUser } from '../../helpers/authUtils';
import { getDate } from '../../helpers/date';
import { TEXTAREA_INPUT_REQUIRED } from '../../constants/formValues';
import { apiAuth } from '../../cidium-api';

export default props => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        remarks: TEXTAREA_INPUT_REQUIRED,
        posting_date: { value: getDate('-') },
    });
    const blankEntry = { account: 0, debit: '', credit: '' };
    const [entriesState, setEntriesState] = useState([blankEntry]);

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };
    const handleItemChange = e => {
        const updatedEntries = [...entriesState];
        updatedEntries[e.target.dataset.idx][e.target.name] = e.target.value;
        setEntriesState(updatedEntries);
    };
    const handleItemDelete = (e, idx) => {
        e.preventDefault();
        const updatedEntries = [...entriesState];
        updatedEntries.splice(idx, 1);
        setEntriesState(updatedEntries);
    };
    const setAccount = (idx, account) => {
        const updatedEntries = [...entriesState];
        updatedEntries[idx].account = account;
        setEntriesState(updatedEntries);
    };
    const addEntry = () => {
        setEntriesState([...entriesState, { ...blankEntry }]);
    };
    const setPostingDate = value => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, posting_date: { ...prevForm.posting_date } };
            updatedForm.posting_date.value = value;
            return updatedForm;
        });
    };
    const submitFormHandler = e => {
        e.persist();
        e.preventDefault();
        setSubmitStatus({ status: null, message: '' });
        setLoading(prevLoading => true);
        let debits = 0.0;
        let credits = 0.0;
        let formIsValid = true;
        entriesState.forEach(entry => {
            if (entry.debit) debits = debits + parseFloat(entry.debit);
            if (entry.credit) credits = credits + parseFloat(entry.credit);
            if (!entry.debit && !entry.credit) {
                formIsValid = false;
            }
        });
        if (credits !== debits || !formIsValid || (credits === 0 && debits === 0)) {
            setLoading(prevLoading => false);
            setSubmitStatus({ status: 'failure', message: 'Form validation errors' });
            return;
        }
        if (!form.remarks.value) {
            setLoading(prevLoading => false);
            setSubmitStatus({ status: 'failure', message: 'Please enter remarks' });
            return;
        }
        apiAuth
            .post(
                '/account/journalentry',
                qs.stringify({
                    remark: form.remarks.value,
                    entries: JSON.stringify(entriesState),
                    posting_date: form.posting_date.value,
                    user_id: getLoggedInUser().id,
                })
            )
            .then(response => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'success', message: `Entries issued` });
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
                    <Button color="success" type="submit" onClick={submitFormHandler}>
                        Add Entries
                    </Button>
                )}
            </>
        );
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Journal Entry', path: '#', active: true },
                        ]}
                        title={'Journal Entry'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <h4 className="header-title mt-0">Journal Entry</h4>
                            <FormGroup>
                                <FormInput
                                    {...form['remarks']}
                                    name="remarks"
                                    placeholder="Remarks"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="text">Posting Date</Label>
                                <Flatpickr
                                    value={form.posting_date.value}
                                    onChange={(e, date) => {
                                        setPostingDate(date);
                                    }}
                                    className="form-control"
                                />
                            </FormGroup>

                            <Button color="info" onClick={addEntry}>
                                Add
                            </Button>
                            <br />
                            <br />
                            {entriesState.map((val, idx) => {
                                return (
                                    <div key={idx} xs={12} sm={12} md={12}>
                                        <Entry
                                            idx={idx}
                                            entriesState={entriesState}
                                            handleItemChange={handleItemChange}
                                            handleItemDelete={e => handleItemDelete(e, idx)}
                                            setAccount={setAccount}
                                        />
                                    </div>
                                );
                            })}
                            <br />
                            <SubmitComponent />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};
