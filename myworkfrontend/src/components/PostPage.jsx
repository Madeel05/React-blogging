import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { userRequest } from '../axiosRequestFunc'
import NavbarTop from './NavbarTop'
import Post from './Post'

const PostPage = () => {

    const [homePosts, setHomePosts] = useState([]);

    const getPosts = async () => {
        try {
            const posts = await userRequest.get('posts');
            setHomePosts(posts.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPosts();
    }, [])


    return (
        <>
            <NavbarTop />
            <div className="container-fluid gedf-wrapper">
                <Row>
                    {homePosts.map(item => <Col lg={6} md={6} className=''> <Post data={item} key={item._id} /> </Col>)}
                </Row>
            </div>
        </>
    )
}

export default PostPage