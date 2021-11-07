import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import Item from './Item';
import './style.css'
import Modal from 'react-modal';
import AuthorEditor from './AuthorEditor';
import { toast } from 'react-toastify';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px'
    },
};



function View() {
    const [authorInfo, setAuthorInfo] = useState([]);
    const [addAuthorInfo, setAddAuthorInfo] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);

    // fetching all Data from server
    useEffect(() => {
        axios.get(`https://care-box-backend.herokuapp.com/api/v1/applicant_test/`).then(res => setAuthorInfo(res.data))
    }, []);

    const saveAuthor = async (e) => {
        e.preventDefault()
        try {
            // converting to form data
            const form = new FormData()
            const a = Object.entries(addAuthorInfo);
            a.map(b => form.append(b[0], b[1]));

            //if make edit request, it will be true and call edit option
            if (!isEdit) {
                axios.post(`https://care-box-backend.herokuapp.com/api/v1/applicant_test/`, form, {
                    headers:
                    {
                        "Custom-User-Agent": "gsdf#g3243F466$",
                    }
                }).then(res => {
                    console.log(res)
                    toast.success(res.data.message);
                    setEdit(false)
                    setIsOpen(false)
                });
            } else {
                axios.put(`https://care-box-backend.herokuapp.com/api/v1/applicant_test/update_blog/${addAuthorInfo.id}/`, form, {
                    headers:
                    {
                        "Custom-User-Agent": "gsdf#g3243F466$",
                    }
                }).then(res => {
                    console.log(res)
                    toast.success(res.data.message);
                    setEdit(false)
                    setIsOpen(false)
                });
            }


        } catch (error) {
            console.log(error)
            toast.error('something want wrong, please try again')
        }
    }

    // work for edit enable
    const editEnable = (e) => {
        console.log(e)
        setIsOpen(true);
        setAddAuthorInfo(e)
        setEdit(true)
    }
    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>
                Add Blog
            </Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {authorInfo && authorInfo.map(author => <Item key={author.id} item={author} editEnable={editEnable} />)}
                </tbody>
            </Table>
            {/* editor model */}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AuthorEditor
                    info={addAuthorInfo}
                    setInfo={setAddAuthorInfo}
                    action={saveAuthor}
                />
                <Button className='mt-4' onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </Modal>
        </div>
    )
}

export default View
