import React, { useState, useEffect } from 'react';
import { Badge, Card, CardBody, Table, Spinner } from 'reactstrap';

export default ({ results, loading }) => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        console.log(results);
        if (results.length === 0) return;

        let totalOverdue = 0;
        let zeroToOne = 0;
        let oneToThree = 0;
        let threeToSix = 0;
        let sixToTwelve = 0;
        let aboveTwelve = 0;

        for (let i = 0; i < results.length; i++) {
            totalOverdue += parseFloat(results[i].amount_pending);
            if(parseFloat(results[i].overdue_index) > 0 && parseFloat(results[i].overdue_index) <= 1) {
                zeroToOne += parseFloat(results[i].amount_pending);
            } else if (parseFloat(results[i].overdue_index) > 1 && parseFloat(results[i].overdue_index) <= 3) {
                oneToThree += parseFloat(results[i].amount_pending);
            } else if (parseFloat(results[i].overdue_index) > 3 && parseFloat(results[i].overdue_index) <= 6) {
                threeToSix += parseFloat(results[i].amount_pending);
            } else if (parseFloat(results[i].overdue_index) > 6 && parseFloat(results[i].overdue_index) <= 12) {
                sixToTwelve += parseFloat(results[i].amount_pending);
            } else if (parseFloat(results[i].overdue_index) > 12) {
                aboveTwelve += parseFloat(results[i].amount_pending);
            }
        }

        setSummary(prevSummary => {
            return {
                totalOverdue,
                zeroToOne,
                oneToThree,
                threeToSix,
                sixToTwelve,
                aboveTwelve,
            }
        })
    }, [results])

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Arrears Summary</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Age</th>
                            <th>Value</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summary !== null ? (<>
                            <tr>
                                <td>0 - 1</td>
                                <td>{parseFloat(summary.zeroToOne.toFixed(2)).toLocaleString()}</td>
                                <td>{(summary.zeroToOne / summary.totalOverdue * 100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td>1 - 3</td>
                                <td>{parseFloat(summary.oneToThree.toFixed(2)).toLocaleString()}</td>
                                <td>{(summary.oneToThree / summary.totalOverdue * 100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td>3 - 6</td>
                                <td>{parseFloat(summary.threeToSix.toFixed(2)).toLocaleString()}</td>
                                <td>{(summary.threeToSix / summary.totalOverdue * 100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td>6 - 12</td>
                                <td>{parseFloat(summary.sixToTwelve.toFixed(2)).toLocaleString()}</td>
                                <td>{(summary.sixToTwelve / summary.totalOverdue * 100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td>{'>'} 12</td>
                                <td>{parseFloat(summary.aboveTwelve.toFixed(2)).toLocaleString()}</td>
                                <td>{(summary.aboveTwelve / summary.totalOverdue * 100).toFixed(2)}%</td>
                            </tr>
                        </>) : null}
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};