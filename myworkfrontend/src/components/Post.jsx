import React, { useEffect, useState } from 'react';
import { CalendarMonthTwoTone, ThumbUp, Comment, Share } from '@mui/icons-material';
import { Card } from 'react-bootstrap';
import avatar from "../img/avatar_2x.png";
import { clientRequest } from '../axiosRequestFunc';


const Post = (props) => {
    const userId = JSON.parse(localStorage.getItem("persist:root")) != null && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)._id : null;
    const [like, setLike] = useState(props.data.likes.length);
    
    const likeFinction = () => {
        if (props.data.likes.find(ele => ele === userId)) {
            var element = document.getElementById(`${props.data._id}`);
                element.classList.add("text-danger");
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

    useEffect(() => {
        likeFinction();
    }, [])

    return (
        <>
            <Card className='gedf-card my-3 mr-2 ml-2'>
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mr-2">
                                <img className="rounded-circle" width="45" src={avatar} alt="" />
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <div className="h5 m-0">{props.data.email}</div>
                                <div className="h7 text-muted">{props.data.username}</div>
                            </div>
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
                    <Card.Link style={{ cursor: "pointer" }}><Comment fontSize='small' /> Comment</Card.Link>
                    <Card.Link style={{ cursor: "pointer" }}><Share fontSize='small' />Share</Card.Link>
                </Card.Footer>
            </Card>
        </>
    )
}

export default Post