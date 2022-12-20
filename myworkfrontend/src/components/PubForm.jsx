import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { clientRequest } from '../axiosRequestFunc';
import { Alert } from './Alert';

const PubForm =  (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState();
    const username = JSON.parse(localStorage.getItem("persist:root")) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).username : null;
    const email = JSON.parse(localStorage.getItem("persist:root")) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).email : null;
    const submitPost = async (e) => {
        e.preventDefault();
        try{
            const post = await clientRequest.post('posts', {title, description, username, email});
            setTitle('');
            setDescription('');
            props.postFuntion();
            props.countFunction();
            Alert('success', 'Your Post published successfully ','success');
        }catch(err){
            Alert('ERROR', `${err}`,'danger');
        }
    }

    return (
        <>
            <Form autoComplete='off' onSubmit={submitPost}>
                <Form.Group className='mb-3'>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title" required/>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as='textarea' rows='3' name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What are you thinking?" required/>
                </Form.Group>
                <Button type="submit">Published</Button>
            </Form>
        </>
    )
}

export default PubForm