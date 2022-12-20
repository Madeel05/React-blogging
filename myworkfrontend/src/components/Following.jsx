import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { People, ImageSharp } from '@mui/icons-material';
import { clientRequest, userRequest } from '../axiosRequestFunc';
import NavbarTop from './NavbarTop';
import FollowCard from './FollowCard';

const userId = JSON.parse(localStorage.getItem("persist:root")) != null && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)._id : null;

const Following = () => {
    const [following, setFollowing] = useState();
    const [userData, setUserData] = useState({});
    const [postsCount, setPostsCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [follower, setFollower] = useState();

    useEffect(() => {
        const getfolowing = async () => {
            try {
                const fol = await clientRequest.get('follow/following');
                setFollowing(fol.data);
            } catch (error) {
                console.log(error);
            }
        }
        getfolowing();
    }, []);

    useEffect(() => {
        const getfollowers = async () => {
            try {
                const fol = await clientRequest.get('follow/followers');
                setFollower(fol.data);
            } catch (error) {
                console.log(error);
            }
        }
        getfollowers();
    }, []);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const user = await userRequest.get(`users/${userId}`,{params:{userId:'143545'}});
                setUserData(user.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getUserById();
    }, [])

    const getPostsCount = async () => {
        try {
            const count = await clientRequest.get('posts/count');
            setPostsCount(count.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getFollowerCount = async () => {
        try {
            const count = await clientRequest.get('follow/followers/count');
            setFollowerCount(count.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getFollowingCount = async () => {
        try {
            const count = await clientRequest.get('follow/following/count');
            setFollowingCount(count.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostsCount();
        getFollowerCount();
        getFollowingCount();
    }, []);

    return (
        <>
            <NavbarTop />
            <div className="container-fluid gedf-wrapper">
                <Row>
                    <Col lg={4} md={4}>
                        <Card>
                            <div className="card-body">
                                <div className="h5 mb-3">{userData.email}</div>
                                <div className="h6 text-muted">Fullname : {userData.username}</div>
                                <div className="h6">{userData.description}
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="h6 text-muted"><i><People className='text-primary' /></i> Followers</div>
                                    <div className="h5">{followerCount}</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="h6 text-muted"><i ><People className='text-primary' /></i> Following</div>
                                    <div className="h5">{followingCount}</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="h6 text-muted"><i ><ImageSharp className='text-primary' /></i> Blogs</div>
                                    <div className="h5">{postsCount}</div>
                                </li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </Card>
                    </Col>
                    <Col lg={4} md={4} >
                        <Card className='gedf-card mt-3 mt-lg-0 mt-md-0'>
                            <Card.Header>
                                <h6 style={{ marginTop: "0.5rem" }}>People You Followed</h6>
                            </Card.Header>
                            <div className='card-body' style={{padding:"5px"}}>
                                <Row>
                                    <Col xs={12}>
                                        {following?.map(item => <FollowCard data={item} fId={item.userId_2} key={item._id} />)}
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={4} md={4}>
                        <Card className='gedf-card mt-3 mt-lg-0 mt-md-0'>
                            <Card.Header>
                                <h6 style={{ marginTop: "0.5rem" }}>People Follow You</h6>
                            </Card.Header>
                            <div className='card-body' style={{ padding: "5px" }}>
                                <Row>
                                    <Col xs={12}>
                                        {follower?.map(item => <FollowCard data={item} fId={item.userId_1} key={item._id} />)}
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Following