import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const CollectionAchievement = () => {
    const [achievements, setAchievements] = useState(null);

    useEffect(() => {
        const fetchAchievements = () => {
            apiAuth
                .get(`/reporting/achievementsummary`)
                .then(res => {
                    if (res.data === null) setAchievements(prevReceipts => []);
                    else setAchievements(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchAchievements();
    }, []);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Collection Achievement Summary</h4>

                {achievements !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                        <thead>
                            <tr>
                                <th>Officer</th>
                                <th>Month</th>
                                <th>Target</th>
                                <th>Collection</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {achievements.map((achievement, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link to={'/contracts/search?search=&state=&officer=' + achievement.user_id + '&batch=&npl='}>{achievement.officer}</Link></td>
                                        <td>{achievement.month}</td>
                                        <td><Badge color="info">{achievement.target.toLocaleString()}</Badge></td>
                                        <td>{achievement.target >= achievement.collection ? <>
                                            <Badge color="danger">{achievement.collection.toLocaleString()}</Badge>
                                        </> : <>
                                                <Badge color="success">{achievement.collection.toLocaleString()}</Badge>
                                            </>}
                                        </td>
                                        <td>{achievement.collection_percentage} %</td>
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

export default CollectionAchievement;