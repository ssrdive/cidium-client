import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

export default () => {
    const [arrearsAnlysis, setArrearsAnlysis] = useState(null);

    useEffect(() => {
        const fetchAnalysis = () => {
            let date = new Date();
            let today = `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            apiAuth
                .get(`/reporting/arrearsanalysis?startdate=2022-01-01&enddate=${today}`)
                .then(res => {
                    if (res.data === null) setArrearsAnlysis(prevAnalysis => []);
                    else setArrearsAnlysis(prevAnalysis => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchAnalysis();
    }, []);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Arrears Analysis</h4>

                {arrearsAnlysis !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                        <thead>
                            <tr>
                                <th>Officer</th>
                                <th>Start Arrears</th>
                                {/* <th>Start Arrears at End Date</th> */}
                                <th>Start Arrears Collection</th>
                                <th>Current Due</th>
                                <th>Due Collection</th>
                                <th>End Date Arrears</th>
                                <th>Current Arrears</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrearsAnlysis.map((analysis, index) => {
                                let betweenArrearsCollectionPercentage = parseFloat(analysis.arrears_collection_amount_from_start_date) * 100 / parseFloat(analysis.start_date_arrears);
                                let arrearsAccumulationAtEnd = (parseFloat(analysis.end_date_arrears) - parseFloat(analysis.start_date_arrears)) * 100 / parseFloat(analysis.start_date_arrears);
                                let dueCollection = parseFloat(analysis.start_date_due_for_period) - parseFloat(analysis.end_date_due_for_period);
                                let dueCollectionPercentage = (parseFloat(analysis.start_date_due_for_period) - parseFloat(analysis.end_date_due_for_period)) * 100 / parseFloat(analysis.start_date_due_for_period);
                                return (
                                    <>
                                        <tr key={index}>
                                            <td><Link to={'/contracts/search?search=&state=&officer=' + analysis.user_id + '&batch=&npl='}>{analysis.officer}</Link></td>
                                            <td>{analysis.start_date_arrears.toLocaleString()}</td>
                                            <td>{betweenArrearsCollectionPercentage < 45 ? <>{betweenArrearsCollectionPercentage < 20 ? <>{analysis.arrears_collection_amount_from_start_date.toLocaleString()} <Badge color="danger">{betweenArrearsCollectionPercentage.toFixed(2)}%</Badge></> : <>
                                                {analysis.arrears_collection_amount_from_start_date.toLocaleString()} <Badge color="warning">{betweenArrearsCollectionPercentage.toFixed(2)}%</Badge>
                                            </>}</> : <>{analysis.arrears_collection_amount_from_start_date.toLocaleString()} <Badge color="success">{betweenArrearsCollectionPercentage.toFixed(2)}%</Badge></>}</td>
                                            <td>{analysis.start_date_due_for_period.toLocaleString()}</td>
                                            <td>{(Math.round(dueCollection * 100) / 100).toLocaleString()} {dueCollectionPercentage < 80 ? <><Badge color="danger">{dueCollectionPercentage.toFixed(2)}%</Badge></> : <><Badge color="success"> {dueCollectionPercentage.toFixed(2)}% </Badge></>}</td>
                                            <td>{analysis.end_date_arrears.toLocaleString()} {arrearsAccumulationAtEnd < 0 ? <><Badge color="success">{arrearsAccumulationAtEnd.toFixed(2)}%</Badge></> : <><Badge color="danger">+{arrearsAccumulationAtEnd.toFixed(2)}%</Badge></>}</td>
                                            <td>{analysis.current_arrears.toLocaleString()}</td>
                                        </tr>
                                    </>
                                );
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
