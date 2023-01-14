import React, { useEffect, useState } from 'react';
import { CalendarMonthTwoTone, ThumbUp, Comment, Share, ArrowDropDown } from '@mui/icons-material';
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { clientRequest, userRequest } from '../axiosRequestFunc';
import { Alert } from './Alert';
import { RWebShare } from "react-web-share";


const Post = (props) => {
    const userId = JSON.parse(localStorage.getItem("persist:root")) != null && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)._id : null;
    const [like, setLike] = useState(props.data.likes.length);
    const [postUser, setPostUser] = useState({});

    const likeFinction = () => {
        if (props.data.likes.find(ele => ele === userId)) {
            var element = document.getElementById(`${props.data._id}`);
            element.classList.add("text-danger");
        }
    }

    const delete_button_fuc = async () => {
        if (props.data.userId !== userId) {
            var bu = document.getElementById(`delete_${props.data._id}`);
            bu.classList.add("d-none");
        }
    }

    const deletePost = async (id) => {
        try {
            const delete_post = await userRequest.delete(`posts/${userId}/${id}`);
            if (props.page === 'home') {
                props.countFunction();
            }
            props.postFuntion();
            Alert('success', 'Your Post Deleted successfully ', 'success');
        } catch (error) {
            Alert('ERROR', `${error}`, 'danger');
        }
    }

    const likePost = async (id) => {
        try {
            const postLike = await clientRequest.post(`posts/like/${id}`);
            if (postLike.status === 201) {
                setLike(prev => prev - 1);
                var element = document.getElementById(`${props.data._id}`);
                element.classList.remove("text-danger");
                console.log(postLike);

            } else if (postLike.status === 200) {
                setLike(prev => prev + 1);
                var element = document.getElementById(`${props.data._id}`);
                element.classList.add("text-danger");
                console.log(postLike);
            }

        } catch (error) {
            console.log(error)
        }
    }
    const getUserDataById = async () => {
        try {
            const page = await userRequest.get(`users/userdata/${props.data.userId}`);
            setPostUser(page.data);
        }
        catch (err) {
            console.log(err);
        }
    } 
    useEffect(() => {
        likeFinction();
        getUserDataById();
        delete_button_fuc();
    }, [])

    return (
        <>
    
            <Card className='gedf-card my-3 mr-2 ml-2'>
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mr-2">
                                <img className="rounded-circle activator" width="45" height="45" src={postUser.image} alt="" />
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <div className="h5 m-0">{props.data.email}</div>
                                <div className="h7 text-muted">{props.data.username}</div>
                            </div>
                        </div>
                        <div id={`delete_${props.data._id}`}>
                            <DropdownButton className='btn-sm btn-icon' size='sm' id="dropdown-basic-button" title={<ArrowDropDown />}>
                                <Dropdown.Item href="#" onClick={() => deletePost(props.data._id)}>Delete</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="text-muted h7 mb-2"><CalendarMonthTwoTone /> {props.data.createdAt}</div>
                    <Card.Link>
                        <Card.Title className='h7'>{props.data.title}</Card.Title>
                    </Card.Link>
                    <Card.Text>
                        {props.data.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Card.Link id={props.data._id} onClick={() => likePost(props.data._id)} style={{ cursor: "pointer" }}><ThumbUp fontSize='small' /> <span>Like({like})</span></Card.Link>
                    <RWebShare
                        data={{
                            text: "Web Share - React Blogging",
                            url: "http://localhost:3000",
                            title: "React Blogging",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Card.Link style={{ cursor: "pointer" }}><Share fontSize='small' />Share</Card.Link>
                    </RWebShare>

                </Card.Footer>
            </Card>
        </>
    )
}

export default Post