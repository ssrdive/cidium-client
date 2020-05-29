import React, { useState, useEffect } from 'react';
import { Badge, Card, CardBody, Table, Spinner, Row, Col } from 'reactstrap';

export default ({ results, loading }) => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        console.log(results);
        if (results.length === 0) return;

        const noOfContracts = results.length;
        let totalOverdue = 0;
        let totalStartOverdue = 0;
        let totalEndOverdue = 0;
        let startOdIndex = 0;
        let endOdIndex = 0;
        let totalAgreement = 0;
        let totalPaid = 0;
        let totalPayable = 0;
        let totalDIPaid = 0;
        for (let i = 0; i < results.length; i++) {
            totalOverdue += parseFloat(results[i].amount_pending);
            totalStartOverdue += parseFloat(results[i].start_amount_pending);
            totalEndOverdue += parseFloat(results[i].end_amount_pending);
            if (results[i].start_overdue_index !== "N/A") {
                startOdIndex += parseFloat(results[i].start_overdue_index);
            }
            if (results[i].end_overdue_index !== "N/A") {
                endOdIndex += parseFloat(results[i].end_overdue_index);
            }
            totalAgreement += parseFloat(results[i].total_agreement);
            totalPaid += parseFloat(results[i].total_paid);
            totalPayable += parseFloat(results[i].total_payable);
            totalDIPaid += parseFloat(results[i].total_di_paid);
        }

        let collectionPercent = (totalPaid / (totalOverdue + totalPaid)) * 100;
        let odIndexVariation = endOdIndex - startOdIndex;
        let overdueVariation = totalEndOverdue - totalStartOverdue;

        totalOverdue = +totalOverdue.toFixed(2);
        totalStartOverdue = +totalStartOverdue.toFixed(2);
        totalEndOverdue = +totalEndOverdue.toFixed(2);
        overdueVariation = +overdueVariation.toFixed(2);
        startOdIndex = +startOdIndex.toFixed(2);
        odIndexVariation = odIndexVariation.toFixed(2);
        endOdIndex = +endOdIndex.toFixed(2);
        totalAgreement = +totalAgreement.toFixed(2);
        totalPaid = +totalPaid.toFixed(2);
        totalPayable = +totalPayable.toFixed(2);
        totalDIPaid = +totalDIPaid.toFixed(2);
        collectionPercent = +collectionPercent.toFixed(2);

        setSummary(prevSummary => {
            return {
                noOfContracts,
                totalOverdue,
                totalStartOverdue,
                totalEndOverdue,
                overdueVariation,
                startOdIndex,
                endOdIndex,
                odIndexVariation,
                totalAgreement,
                totalPaid,
                totalPayable,
                totalDIPaid,
                collectionPercent
            }
        })
    }, [results])

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Portfolio Summary</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summary !== null ? (<>
                            <tr>
                                <td>No of Contracts</td>
                                <td><Badge color="primary">{summary.noOfContracts}</Badge></td>
                            </tr>

                            <tr>
                                <td>Total Overdue</td>
                                <td>{summary.totalOverdue > 0 ? (<Badge color="danger">{summary.totalOverdue.toLocaleString()}</Badge>) : (<Badge color="success">0</Badge>)}</td>
                            </tr>
                            <tr>
                                <td>Total Agreement</td>
                                <td><Badge color="primary">{summary.totalAgreement.toLocaleString()}</Badge></td>
                            </tr>
                            <tr>
                                <td>Total Paid</td>
                                <td><Badge color="success">{summary.totalPaid.toLocaleString()}</Badge></td>
                            </tr>
                            <tr>
                                <td>Total Payable</td>
                                <td><Badge color="warning">{summary.totalPayable.toLocaleString()}</Badge></td>
                            </tr>
                            <tr>
                                <td>Total DI Paid</td>
                                <td><Badge color="primary">{summary.totalDIPaid.toLocaleString()}</Badge></td>
                            </tr>
                            <tr>
                                <td>Collection Ratio</td>
                                <td><Badge color="primary">{summary.collectionPercent}%</Badge></td>
                            </tr>
                        </>) : null}
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};