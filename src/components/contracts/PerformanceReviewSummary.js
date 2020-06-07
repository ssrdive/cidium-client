import React, { useState, useEffect } from 'react';
import { Badge, Card, CardBody, Table, Spinner } from 'reactstrap';

export default ({ results, loading, startdate, enddate }) => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        console.log(results);
        if (results.length === 0) return;

        const noOfContracts = results.length;
        let totalOverdue = 0;
        let totalStartOverdue = 0;
        let totalEndOverdue = 0;
        let totalStartBetweenOverdue = 0;
        let totalEndBetweenOverdue = 0;
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
            totalStartBetweenOverdue += parseFloat(results[i].start_between_amount_pending);
            totalEndBetweenOverdue += parseFloat(results[i].end_between_amount_pending);
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
        let betweenOverdueVariation = totalEndBetweenOverdue - totalStartBetweenOverdue;
        let betweenCollectionPercent = (Math.abs(betweenOverdueVariation) * 100) / totalStartBetweenOverdue;

        totalOverdue = +totalOverdue.toFixed(2);
        totalStartOverdue = +totalStartOverdue.toFixed(2);
        totalEndOverdue = +totalEndOverdue.toFixed(2);
        totalStartBetweenOverdue = +totalStartBetweenOverdue.toFixed(2);
        totalEndBetweenOverdue = +totalEndBetweenOverdue.toFixed(2);
        betweenOverdueVariation = +betweenOverdueVariation.toFixed(2);
        betweenCollectionPercent = +betweenCollectionPercent.toFixed(2);
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
                totalStartBetweenOverdue,
                totalEndBetweenOverdue,
                betweenOverdueVariation,
                betweenCollectionPercent,
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
                <h4 className="header-title mt-0 mb-1">Performance Summary</h4>
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
                                <td>Start Date</td>
                                <td><b>{startdate}</b></td>
                            </tr>
                            <tr>
                                <td>End Date</td>
                                <td><b>{enddate}</b></td>
                            </tr>
                            <tr>
                                <td>Start Overdue</td>
                                <td>{summary.totalStartOverdue > 0 ? (<Badge color="danger">{summary.totalStartOverdue.toLocaleString()}</Badge>) : (<Badge color="success">0</Badge>)}</td>
                            </tr>
                            <tr>
                                <td>End Overdue</td>
                                <td>{summary.totalEndOverdue > 0 ? (<Badge color="danger">{summary.totalEndOverdue.toLocaleString()}</Badge>) : (<Badge color="success">0</Badge>)}</td>
                            </tr>
                            <tr>
                                <td>Overdue Variation</td>
                                <td>{summary.overdueVariation == 0 ? <><font color="blue">{summary.overdueVariation.toLocaleString()}</font></> : <>{summary.overdueVariation > 0 ? <><font color="red">{'+'}{summary.overdueVariation.toLocaleString()}</font></> : <>{summary.overdueVariation === "N/A" ? <><font color="green">{summary.overdueVariation.toLocaleString()}</font></> : <><font color="green">{summary.overdueVariation.toLocaleString()}</font></>}</>}</>}</td>
                            </tr>
                            <tr>
                                <td>Start Between Overdue</td>
                                <td>{summary.totalStartBetweenOverdue > 0 ? (<Badge color="danger">{summary.totalStartBetweenOverdue.toLocaleString()}</Badge>) : (<Badge color="success">0</Badge>)}</td>
                            </tr>
                            <tr>
                                <td>End Between Overdue</td>
                                <td>{summary.totalEndBetweenOverdue > 0 ? (<Badge color="danger">{summary.totalEndBetweenOverdue.toLocaleString()}</Badge>) : (<Badge color="success">0</Badge>)}</td>
                            </tr>
                            <tr>
                                <td>Between Overdue Variation</td>
                                <td>{summary.betweenOverdueVariation == 0 ? <><font color="red">{summary.betweenOverdueVariation.toLocaleString()}</font></> : <>{summary.betweenOverdueVariation > 0 ? <><font color="red">{'+'}{summary.betweenOverdueVariation.toLocaleString()}</font></> : <>{summary.overdueVariation === "N/A" ? <><font color="green">{summary.betweenOverdueVariation.toLocaleString()}</font></> : <><font color="green">{summary.betweenOverdueVariation.toLocaleString()}</font></>}</>}</>}</td>
                            </tr>
                            <tr>
                                <td>Between Collection Ratio</td>
                                <td><Badge color="primary">{summary.betweenCollectionPercent}%</Badge></td>
                            </tr>
                            <tr>
                                <td>Start Od Index</td>
                                <td>{summary.startOdIndex > 0 ? (<Badge color="danger">{summary.startOdIndex}</Badge>) : (<Badge color="success">0</Badge>)}</td>
                            </tr>
                            <tr>
                                <td>End Od Index</td>
                                <td>{summary.endOdIndex > 0 ? (<Badge color="danger">{summary.endOdIndex}</Badge>) : (<Badge color="success">0</Badge>)}</td>
                            </tr>
                            <tr>
                                <td>Od Index Variation</td>
                                <td>{summary.odIndexVariation == 0 ? <><font color="blue">{summary.odIndexVariation}</font></> : <>{summary.odIndexVariation > 0 ? <><font color="red">{'+'}{summary.odIndexVariation}</font></> : <>{summary.odIndexVariation === "N/A" ? <><font color="green">{summary.odIndexVariation}</font></> : <><font color="green">{summary.odIndexVariation}</font></>}</>}</>}</td>
                            </tr>
                        </>) : null}
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};