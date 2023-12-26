import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Alert, Col, Card, CardBody, Form, FormGroup, Row, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import FormInput from '../form/FormInput';
import { TEXT_INPUT_OPTIONAL, DROPDOWN_DEFAULT } from '../../constants/formValues';
import { getLoggedInUser } from '../../helpers/authUtils';

import SubmitComponent from '../form/SubmitComponent';
import {Link} from "react-router-dom";

const ContractDocumentGeneration = ({ id }) => {
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        const fetchDocumentGeneration = () => {
            apiAuth
                .get(`/contract/statedocgen/${id}`)
                .then(res => {
                    if (res.data === null) setDocuments(prevDocs => []);
                    else setDocuments(prevDocs => res.data);
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDocumentGeneration();
    }, [id]);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Document Generation</h4>

                {documents !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                        <tbody>
                            {documents.map((doc, index) => {
                                return (<tr key={index}>
                                    <td>{doc.name}</td>
                                    <td><Link to={doc.generation_url + id}>
                                        Generate
                                    </Link></td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <Spinner type="grow" color="primary" />
                )}
            </CardBody>
        </Card>
    );
};

export default ContractDocumentGeneration;