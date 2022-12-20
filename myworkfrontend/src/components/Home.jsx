import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import { People, ImageSharp } from '@mui/icons-material';
import NavbarTop from './NavbarTop';
import Post from "../components/Post";
import UserCard from './UserCard';
import PubForm from './PubForm';
import { clientRequest, userRequest } from '../axiosRequestFunc';


const userId = JSON.parse(localStorage.getItem("persist:root")) != null && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)._id : null;

const Home = () => {
    const [key, setKey] = useState('published');
    const [userData, setUserData] = useState({});
    const [latestUser, setLatestUser] = useState([]);
    const [randomUser, setRandomUser] = useState([]);
    const [homePosts, setHomePosts] = useState([]);
    const [postsCount, setPostsCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const getUserById = async () => {
        try {
            const user = await userRequest.get(`users/${userId}`);
            setUserData(user.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getPosts = async () => {
        try {
            const posts = await userRequest.get('posts');
            setHomePosts(posts.data);
        } catch (err) {
            console.log(err)
        }
    }

    const getRandomUser = async () => {
        try {
            const random = await userRequest.get('users/random/5');
            setRandomUser(random.data);
        } catch (err) {
            console.log(err)
        }
    }

    const getLatestUser = async () => {
        try {
            const latest = await userRequest.get('users/latestUser/5');
             setLatestUser(latest.data);
        } catch (err) {
            console.log(err)
        }
    }

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
        getUserById();
        getPostsCount();
        getFollowerCount();
        getFollowingCount();
        getRandomUser();
        getLatestUser();
        getPosts();
    }, [])


    return (
        <>
            <NavbarTop />
            <div className="container-fluid gedf-wrapper">
                <Row>
                    <Col lg={3} md={3}>
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
                    <Col lg={6} md={6} className='gedf-main'>
                        <Card className='gedf-card my-3 mr-2 ml-2'>
                            <Card.Header>
                                <div>
                                    <div className="h5 m-2">Publish Your Blog</div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3">
                                    <Tab eventKey="published" title="Make a publication">
                                        <PubForm postFuntion={getPosts} countFunction={getPostsCount} />
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                        {homePosts.map(item => <Post data={item} key={item._id} />)}
                    </Col>
                    <Col lg={3} md={3}>
                        <Card className='gedf-card mt-3 mt-lg-0 mt-md-0'>
                            <Card.Header>
                                <h6 style={{ marginTop: "0.5rem" }}>Suggested by blogging</h6>
                            </Card.Header>
                            <div className='card-body'>
                                <Row>
                                    <Col xs={12}>
                                        {
                                            randomUser.map(item => <UserCard name={item.username} key={item._id} id={item._id} randomUser={getRandomUser} latestUser={getLatestUser} count={getFollowingCount} />)
                                        }
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                        <Card className='gedf-card mt-3 mt-lg-0 mt-md-0'>
                            <Card.Header>
                                <h6 style={{ marginTop: "0.5rem" }}>New on blogging</h6>
                            </Card.Header>
                            <div className='card-body'>
                                <Row>
                                    <Col xs={12}>
                                        {
                                            latestUser.map(item => <UserCard name={item.username} key={item._id} id={item._id} randomUser={getRandomUser} latestUser={getLatestUser} count={getFollowingCount} />)
                                        }
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

export default Home;