import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Alert } from './Alert';
import { clientRequest } from '../axiosRequestFunc';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = (props) => {

    var initialState = 'follow';
    const detailPage = useNavigate();
    const [followText, setFollowText] = useState(initialState);

    const folowUser = async (id) => {
        try {
            const follow = await clientRequest.post(`follow/${id}`);
            props.count();
            if (follow.status === 200) {
                setFollowText('Followed')
            }
            if (follow.status === 201) {
                setFollowText('Follow')
                Alert('Unfolowed', `You Unfollowed This User`, 'warning');
            }
        } catch (error) {
            Alert('WARNING', `Try Again Somrthing Wrong`, 'warning');
        }
    }

    useEffect(() => {
        const checkFollow = async () => {
            try {
                const check = await clientRequest.get(`follow/checkFollow/${props.id}`);
                if (check.status === 201) {
                    setFollowText(initialState);
                } else if (check.status === 200) {
                    setFollowText('Followed');
                }
            } catch (error) {
                console.log('gg');
            }
        }
        checkFollow();
    });

    return (
        <>
            <div className="d-flex justify-content-between align-items-center friend-state">
                <div className="d-flex" onClick={() => detailPage(`userDetail/${props.id}`)}>
                    <div>
                    <img className="rounded-circle activator" onClick={() => detailPage(`userDetail/${props.id}`)} src={props.data ? props.data.image : ''} width="35" height="35" alt="" />
                    </div>
                    <div className="mx-2 my-1 h7" onClick={() => detailPage(`userDetail/${props.id}`)}>
                        {props.name}
                    </div>
                </div>
                <div>
                    <Button variant='primary' id={props.id} onClick={() => folowUser(props.id)} className="btn-sm">
                        {followText}
                    </Button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default UserCard