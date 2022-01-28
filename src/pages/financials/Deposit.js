import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Row, Col, Card, CardBody, Button, Label, FormGroup, Spinner, UncontrolledAlert } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

import FormInput from '../../components/form/FormInput';

import PageTitle from '../../components/PageTitle';
import Entry from '../../components/financials/DepositItem';
import { getLoggedInUser } from '../../helpers/authUtils';
import { getDate } from '../../helpers/date';
import { TEXTAREA_INPUT_REQUIRED, DROPDOWN_DEFAULT, NUMBER_INPUT_REQUIRED } from '../../constants/formValues';
import { apiAuth } from '../../cidium-api';
import { loadDropdownAccountGeneric } from '../../helpers/form';

const DepositPage = props => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        to_account: DROPDOWN_DEFAULT,
        amount: NUMBER_INPUT_REQUIRED,
        remarks: TEXTAREA_INPUT_REQUIRED,
        posting_date: { value: getDate('-') },
    });
    const blankEntry = { account: 0, amount: '' };
    const [entriesState, setEntriesState] = useState([blankEntry]);

    useEffect(() => {
        loadDropdownAccountGeneric('account', 'to_account', 1, 1, setForm);
    }, []);

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
        setLoading(prevLoading => true);
        setSubmitStatus({ status: null, message: '' });
        if (!form.amount.value || !form.remarks.value) {
            setLoading(prevLoading => false);
            setSubmitStatus({ status: 'failure', message: 'Form validation errors' });
            return;
        }
        let amounts = 0;
        let formIsValid = true;
        entriesState.forEach(entry => {
            if (entry.amount) amounts = amounts + parseFloat(entry.amount);
            else formIsValid = false;
        });
        if (amounts !== parseFloat(form.amount.value) || !formIsValid || amounts === 0) {
            setLoading(prevLoading => false);
            setSubmitStatus({ status: 'failure', message: 'Form validation errors' });
            return;
        }
        apiAuth
            .post(
                '/account/deposit',
                qs.stringify({
                    remark: form.remarks.value,
                    entries: JSON.stringify(entriesState),
                    to_account_id: form.to_account.value,
                    amount: form.amount.value,
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
                            { label: 'Deposit', path: '#', active: true },
                        ]}
                        title={'Deposit'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <h4 className="header-title mt-0">Deposit</h4>
                            <FormGroup>
                                <Label for="text">To Account</Label>
                                <FormInput
                                    {...form['to_account']}
                                    name="to_account"
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
                            <FormGroup>
                                <Label for="text">Amount</Label>
                                <FormInput
                                    {...form['amount']}
                                    name="amount"
                                    placeholder="Amount"
                                    handleOnChange={handleOnChange}
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
                            <FormGroup>
                                <FormInput
                                    {...form['remarks']}
                                    name="remarks"
                                    placeholder="Remarks"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <SubmitComponent />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DepositPage;