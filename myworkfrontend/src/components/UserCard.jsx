import React, { useEffect } from 'react';
import avatar from "../img/avatar_2x.png";
import { Button } from 'react-bootstrap';
import { Alert } from './Alert';
import { clientRequest } from '../axiosRequestFunc';
import { useState } from 'react';

const UserCard = (props) => {

    var initialState = 'follow';
    const [followText, setFollowText ] = useState(initialState);

    const folowUser = async (id) => {
        try {
            const follow = await clientRequest.post(`follow/${id}`);
            // console.log(follow);
            // props.randomUser();
            // props.latestUser();
            props.count();
            if(follow.status === 200){
                setFollowText('Followed')
            }
            if(follow.status === 201){
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
                }else if(check.status === 200){
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
                <div className="d-flex">
                    <div>
                        <img className="rounded-circle" src={avatar} width="30" alt="" />
                    </div>
                    <div className="mx-2 my-1 h7">
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