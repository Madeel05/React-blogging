import React, { useEffect, useState } from 'react';
import avatar from "../img/avatar_2x.png";
import { Badge, Col } from 'react-bootstrap';
import { userRequest } from '../axiosRequestFunc';

const FollowCard = (props) => {

    const [countPosts, setCountPosts] = useState(0);
    const [countFollower, setCountFollower] = useState(0);
    const [pagaData, setPageData] = useState({}); 

    useEffect(() => {
        getUserDataById();
        getPostsCount();
        getFollowerCount();
    }, [])


    const getPostsCount = async () => {
        try {
            const count = await userRequest.get('posts/count',{params:{userId:props.fId}});
            setCountPosts(count.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getUserDataById = async () => {
        try {
            const page = await userRequest.get(`users/userdata/${props.fId}`);
            setPageData(page.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getFollowerCount = async () => {
        try {
            const count = await userRequest.get('follow/followers/count',{params:{userId:props.fId}});
            setCountFollower(count.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="justify-content-between align-items-center friend-state" >
                <div>
                    <div style={{float:"left"}}>
                        <img className="rounded-circle" src={avatar} width="40" alt="" />
                    </div>
                    <div className='row'>
                        <Col xs={6}>
                            <h6 className="mx-2 my-1">
                                {pagaData ? pagaData.username : ''}
                            </h6>
                        </Col>
                        <Col xs={6}>
                            <Badge className='mx-1'>{countPosts} posts</Badge>
                            <Badge bg='warning'>{countFollower} Followers</Badge>
                        </Col>
                        <Col>
                            <div className='h7 mx-2 my-1'>
                                
                            </div>
                        </Col>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <hr style={{margin:"8px"}} />

        </>
    )
}

export default FollowCard