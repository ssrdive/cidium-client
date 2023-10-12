import React, { useState, useEffect } from 'react';
import { Card, Badge, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const ContractTimeline = ({ id }) => {
    const [installments, setInstallments] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/timeline/${id}`)
                .then(res => {
                    if (res.data === null) setInstallments(prevInstallments => []);
                    else setInstallments(prevInstallments => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDetails();
    }, [id]);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Timeline</h4>

                {installments !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Change</th>
                                <th>Days</th>
                                <th>Days Cumulative</th>
                            </tr>
                        </thead>
                        <tbody>
                            {installments.map((line, index) => {
                                let color = "black"
                                if (line.Type == "Overdue") color = "red";
                                if (line.Type == "Overpayment" || line.Type == "Zero Balance") color = "green"
                                if (line.Type == "Receipt") color = "green";
                                return (
                                    <tr key={index} style={{color: color}}>
                                        {/*<td>{index + 1}</td>*/}
                                        <td>{line.Type}</td>
                                        <td>{line.Type == "Receipt" ? <><b>{line.Amount.toLocaleString()}</b></> : <>{line.Amount.toLocaleString()}</>}</td>
                                        <td>{(line.Type != "Zero Balance" && line.Type != "Overpayment" && line.Type != "Overdue")
                                            ? <>{line.Date.substr(0, 10)}</>
                                            : <></>}</td>
                                        <td>
                                            {
                                                line.Type == "Overdue"
                                                ?   <>
                                                        {parseFloat(line.Change) > 0
                                                            ? <><font color={"red"}>{"+"}{line.Change.toLocaleString()}</font></>
                                                            : <><font color={"green"}>{line.Change.toLocaleString()}</font></>}
                                                    </>
                                                : <>
                                                    </>
                                            }
                                        </td>
                                        <td>{(line.Type == "Zero Balance" || line.Type == "Overpayment" || line.Type == "Overdue") ? <>{line.Days}</> : <></>}</td>
                                        <td>{line.Type == "Overdue" ? <>{line.DaysCumulative}</> : <></>}</td>
                                    </tr>
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

export default ContractTimeline;