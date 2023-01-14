import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import NavbarTop from './NavbarTop';
import { EmojiPeople, ImageSharp, People } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { userRequest } from '../axiosRequestFunc';
import Post from './Post';


const UserDetail = () => {
    const id = useParams().id;
    const [userData, setUserData] = useState({});
    const [postsCount, setPostsCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [Posts, setPosts] = useState();
    const [data, setData] = useState(false);

    const getUserById = async () => {
        try {
            const user = await userRequest.get(`users/userdata/${id}`);
            setUserData(user.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getPostsCount = async () => {
        try {
            const count = await userRequest.get('posts/count', { params: { userId: id } });
            setPostsCount(count.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getFollowerCount = async () => {
        try {
            const count = await userRequest.get('follow/followers/count', { params: { userId: id } });
            setFollowerCount(count.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getFollowingCount = async () => {
        try {
            const count = await userRequest.get('follow/following/count', { params: { userId: id } });
            setFollowingCount(count.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPosts = async () => {
        try {
            const count = await userRequest.get('posts/user', { params: { userId: id } });
            setPosts(count.data);
            if(count.data.length > 0){
                setData(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserById();
        getPostsCount();
        getFollowerCount();
        getFollowingCount();
        getPosts();
    }, []);

    return (
        <>
            <NavbarTop />
            <div className='container bg-light py-3 mt-5'>
                <div className='py-5 mt-5'>
                    <div className='text-center text-primary'>
                        <h2 className='mb-3'>{userData.username}</h2>
                    </div>
                </div>
            </div>
            <div className='container' style={{ marginTop: "-65px" }}>
                <div className='text-center text-primary'>
                    <Row>
                        <Col lg={4} md={4}></Col>
                        <Col lg={4} md={4}>
                            <img className="rounded-circle activator" width="120" height="120" src={userData.image} alt="" />
                        </Col>
                        <Col lg={4} md={4}></Col>
                    </Row>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='text-center text-primary'>
                    <Row>
                        <Col lg={2} md={2}></Col>
                        <Col lg={8} md={8}>
                            <Row>
                                <Col lg={4} md={4}>
                                    <div className="h6 text-muted"><i><EmojiPeople className='text-primary' /></i> Followers</div>
                                    <div className="h5">{followerCount}</div>
                                </Col>
                                <Col lg={4} md={4}>
                                    <div className="h6 text-muted"><i ><People className='text-primary' /></i> Following</div>
                                    <div className="h5">{followingCount}</div>
                                </Col>
                                <Col lg={4} md={4}>
                                    <div className="h6 text-muted"><i ><ImageSharp className='text-primary' /></i> Blogs</div>
                                    <div className="h5">{postsCount}</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={2} md={2}></Col>
                    </Row>
                </div>
            </div>
            <div className='container py-1 mt-4'>
                <div className='py-1 mt-2'>
                    <div className='text-center text-primary'>
                        <h3>All Blogs</h3>
                    </div>
                </div>
            </div>
            <div className='container'>
                <Row>
                    {data ? Posts?.map(item => <Col className='mt-2' lg={6} md={6}> <Post data={item} page='nothome' key={item._id} postFuntion={getPosts} /></Col>) : <div className='col-12 text-center m-4 p-4 text-primary' style={{marginLeft: "-5px"}}><h2>No blog post yet !</h2></div>}
                </Row>
            </div>
        </>
    )
}

export default UserDetail