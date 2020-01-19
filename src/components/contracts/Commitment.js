import React from 'react';
import qs from 'qs';
import { Badge } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

import { getLoggedInUser } from '../../helpers/authUtils';

export default ({ commitment, fetchCommitments }) => {
    // eslint-disable-next-line
    const hrefLink = 'javascript:void(0);';

    const commitmentAction = (id, fulfilled) => {
        apiAuth.post(
            `/contract/commitment/action`,
            qs.stringify({
                id,
                fulfilled,
                user: getLoggedInUser().id,
            })
        ).then(res => {
            fetchCommitments();
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <>
            <p style={{ paddingBottom: 0, marginBottom: 0 }}>
                {commitment.commitment === 1 ? (
                    <>
                        {commitment.fulfilled.Valid ? (
                            <>
                                {commitment.fulfilled.Int32 === 1 ? (
                                    <>
                                        <Badge color="success">Commitment</Badge>{' '}
                                    </>
                                ) : (
                                    <>
                                        <Badge color="danger">Commitment</Badge>{' '}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {commitment.due_in.Int32 <= 0 ? (
                                    <>
                                        <Badge color="warning">Commitment</Badge> Expired{' '}
                                        <Badge color="danger">{Math.abs(commitment.due_in.Int32)} days</Badge> ago{' '}
                                    </>
                                ) : (
                                    <>
                                        <Badge color="info">Commitment</Badge> Expires in{' '}
                                        <Badge color="success">{commitment.due_in.Int32} days</Badge>{' '}
                                    </>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Badge color="primary">Comment</Badge>{' '}
                    </>
                )}
                {commitment.created_by} added on {commitment.created}
            </p>
            {commitment.fulfilled.Valid || commitment.commitment === 0 ? (
                <></>
            ) : (
                <>
                    <a
                        href={hrefLink}
                        onClick={() => {
                            commitmentAction(commitment.id, 1);
                        }}>
                        Fulfilled
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                        href={hrefLink}
                        onClick={() => {
                            commitmentAction(commitment.id, 0);
                        }}
                        style={{ color: 'red' }}>
                        Broken
                    </a>
                </>
            )}
            <p>{commitment.text}</p>
            <hr />
        </>
    );
};
