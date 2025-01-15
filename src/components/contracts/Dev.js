import React, { useState, useEffect } from 'react';
import {Card, CardBody, Table, Spinner, Form, Button} from 'reactstrap';
import ReactJson from 'react-json-view'

import { apiAuth } from '../../cidium-api';
import {
    DROPDOWN_DEFAULT,
    NUMBER_INPUT_OPTIONAL,
    NUMBER_INPUT_REQUIRED, TEXT_INPUT_OPTIONAL,
    TEXT_INPUT_REQUIRED
} from "../../constants/formValues";
import FormInput from "../form/FormInput";
import {
    loadDropdownConditionalGeneric,
    loadDropdownGeneric,
    loadOptionalDropdownConditionalGeneric
} from "../../helpers/form";
import qs from "qs";

import {getLoggedInUser} from "../../helpers/authUtils";

const Dev = ({ id }) => {
    const [contractFinancialRaw, setContractFinancialRaw] = useState(null);
    const [contractFinancialRaw2, setContractFinancialRaw2] = useState(null);
    const [temporaryAssignment, setTemporaryAssignment] = useState(null);
    const [legalCaseStatus, setLegalCaseStatus] = useState(null);

    const [form, setForm] = useState({
        temporary_officer: DROPDOWN_DEFAULT,
        legal_case_status: DROPDOWN_DEFAULT,
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    const handleFormLegalCaseStatusChange = e => {
        e.persist();
        e.preventDefault();
        setLegalCaseStatus(prevVal => {
            return null;
        })
        apiAuth
            .post(
                `/contract/setlegalcasestatus`,
                qs.stringify({
                    contract_id: id,
                    legal_case_status: form.legal_case_status.value,
                })
            )
            .then(res => {
                fetchLegalCaseStatus();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleFormTemporaryAssignment = e => {
        e.persist();
        e.preventDefault();
        setTemporaryAssignment(prevVal => {
            return null;
        })
        apiAuth
            .post(
                `/contract/settemporaryofficer`,
                qs.stringify({
                    contract_id: id,
                    temporary_officer: form.temporary_officer.value,
                })
            )
            .then(res => {
                fetchTemporaryAssignment();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const fetchTemporaryAssignment = () => {
        apiAuth
            .get(`/contract/temporaryassignment/${id}`)
            .then(res => {
                if (res.data === null) setTemporaryAssignment(prevReceipts => []);
                else setTemporaryAssignment(prevReceipts => res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const fetchLegalCaseStatus = () => {
        apiAuth
            .get(`/contract/legalcasestatus/${id}`)
            .then(res => {
                if (res.data === null) setLegalCaseStatus(prevReceipts => []);
                else {
                    setLegalCaseStatus(prevReceipts => res.data);
                    if (res.data[0].legal_case_status == 0) {
                        setForm(prevForm => {
                            const updatedForm = {
                                ...prevForm,
                                ['legal_case_status']: { ...prevForm['legal_case_status'], options: [{ id: '0', name: 'No' }, { id: '1', name: 'Yes' }], value: 0 },
                            };
                            return updatedForm;
                        });
                    } else {
                        setForm(prevForm => {
                            const updatedForm = {
                                ...prevForm,
                                ['legal_case_status']: { ...prevForm['legal_case_status'], options: [{ id: '1', name: 'Yes' }, { id: '0', name: 'No' }], value: 1 },
                            };
                            return updatedForm;
                        });
                    }

                }
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadDropdownConditionalGeneric('user', 'temporary_officer', 'filter_enabled', 1, setForm);

        const fetchReceiptDetails = () => {
            apiAuth
                .get(`/contract/detailfinancialraw/${id}`)
                .then(res => {
                    if (res.data === null) setContractFinancialRaw(prevReceipts => []);
                    else setContractFinancialRaw(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        const fetchReceiptDetails2 = () => {
            apiAuth
                .get(`/contract/detaillegacyfinancialraw/${id}`)
                .then(res => {
                    if (res.data === null) setContractFinancialRaw2(prevReceipts => []);
                    else setContractFinancialRaw2(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchReceiptDetails();
        fetchReceiptDetails2();
        fetchTemporaryAssignment();
        fetchLegalCaseStatus();
    }, [id]);

    const hasAssignTemporaryOfficer =
        getLoggedInUser() && Array.isArray(getLoggedInUser().access_keys) &&
        getLoggedInUser().access_keys.some((item) => item.level === "assign_temporary_officer");


    return (
        <Card>
            <CardBody>

                {hasAssignTemporaryOfficer == true ? (
                    <>
                        <h4 className="header-title mt-0">Temporary Assignment</h4>

                        <Table className="mb-0" responsive={true} striped>
                            <tr>
                                <th>Current Assignment</th>
                                {temporaryAssignment == null ? (
                                    <td>Loading</td>
                                ) : (
                                    <th>{temporaryAssignment[0].recovery_officer}</th>
                                )}
                            </tr>
                            <tr>
                                <td>Change Assignment</td>
                                <td>
                                    <Form onSubmit={handleFormTemporaryAssignment}>
                                        <FormInput
                                            {...form['temporary_officer']}
                                            name="temporary_officer"
                                            handleOnChange={handleOnChange}
                                        />
                                        <br></br>
                                        <Button color="primary" type="submit">
                                            Change
                                        </Button>
                                    </Form>
                                </td>
                            </tr>
                        </Table>
                    </>
                ) : (
                    <></>
                )}

                <h4 className="header-title mt-0">Legal Case Status</h4>

                <Table className="mb-0" responsive={true} striped>
                    <tr>
                        <th>Current Legal Case Status</th>
                        {legalCaseStatus == null ? (
                            <td>Loading</td>
                        ) : (
                            <th>{legalCaseStatus[0].legal_case_status == 0 ? <>No</> : <>Yes</>}</th>
                        )}
                    </tr>
                    <tr>
                        <td>Change Legal Case Status</td>
                        <td>{legalCaseStatus == null ? <>Loading</> : <>
                            <Form onSubmit={handleFormLegalCaseStatusChange}>
                                <FormInput
                                    {...form['legal_case_status']}
                                    name="legal_case_status"
                                    handleOnChange={handleOnChange}
                                />
                                <br></br>
                                <Button color="primary" type="submit">
                                    Change
                                </Button>
                            </Form>
                        </>}</td>
                    </tr>
                </Table>

                <h4 className="header-title mt-0">LKAS 17 Compliant</h4>

                {/* eslint-disable-next-line */}
                {contractFinancialRaw !== null ? (
                    <ReactJson src={contractFinancialRaw}/>
                ) : (
                    <Spinner type="grow" color="primary"/>
                )}

                <br></br>
                <h4 className="header-title mt-0">LKAS 17 Non-Compliant</h4>

                {/* eslint-disable-next-line */}
                {contractFinancialRaw2 !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Capital</th>
                            <th>Interest</th>
                            <th>Capital Paid</th>
                            <th>Interest Paid</th>
                            <th>Capital Payable</th>
                            <th>Interest Payable</th>
                            <th>Due Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contractFinancialRaw2.map((financial, index) => {
                            return (
                                // eslint-disable-next-line
                                <tr key={index}
                                    style={{backgroundColor: (financial.capital_payable != 0 || financial.interest_payable != 0) && financial.due_in < 1 ? '#f7aba6' : ''}}>
                                    <td>{financial.installment_id}</td>
                                    <td>{financial.installment_type}</td>
                                    <td>{financial.capital}</td>
                                    <td>{financial.interest}</td>
                                    <td>{financial.capital_paid}</td>
                                    <td>{financial.interest_paid}</td>
                                    <td>{financial.capital_payable}</td>
                                    <td>{financial.interest_payable}</td>
                                    <td>{financial.due_date}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                ) : (
                    <Spinner type="grow" color="primary"/>
                )}
            </CardBody>
        </Card>
    );
};

export default Dev;