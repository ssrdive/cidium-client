import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import ContractDetails from '../../components/contracts/ContractDetails';
import SelectContractForm from '../../components/payments/SelectContractForm';
import RebateFormNonCompliant from '../../components/admin/RebateFormNonCompliant';
import RebateFormLKAS17 from '../../components/admin/RebateFormLKAS17';
import { apiAuth } from '../../cidium-api';
import SetDefaultAmountForm from '../../components/admin/SetDefaultAmountForm';

const Admin = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const urlID = params.get('id');
    const [id, setID] = useState(urlID);
    const [valid, setValid] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const refreshDetails = () => setReloadKey(prev => prev + 1);
    const [isLKAS17, setIsLKAS17] = useState(null);

    useEffect(() => {
        if (!id) return;
        apiAuth
            .get(`/contract/detailfinancial/${id}`)
            .then(res => {
                setIsLKAS17(res.data && !!res.data.lkas_17);
            })
            .catch(() => setIsLKAS17(null));
    }, [id, reloadKey]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle breadCrumbItems={[{ label: 'Admin', path: '/admin', active: true }]} title={'Admin'} />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <ContractDetails key={reloadKey} id={id} setValid={setValid} />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <SelectContractForm setID={setID} />
                </Col>
                <Col md={4}>
                    {isLKAS17 ? (
                        <RebateFormLKAS17 id={id} valid={valid} onAfterSubmit={refreshDetails} />
                    ) : (
                        <RebateFormNonCompliant id={id} valid={valid} onAfterSubmit={refreshDetails} />
                    )}
                </Col>
                <Col md={4}>
                    <SetDefaultAmountForm id={id} valid={valid} onAfterSubmit={refreshDetails} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Admin;


