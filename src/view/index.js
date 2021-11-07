import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import Item from './Item';
import './style.css'
import Modal from 'react-modal';
import AuthorEditor from './AuthorEditor';

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
    useEffect(() => {
        axios.get(`https://care-box-backend.herokuapp.com/api/v1/applicant_test/`).then(res => setAuthorInfo(res.data))
    }, []);

    const saveAuthor = async (e) => {
        e.preventDefault()
        try {
            console.log(addAuthorInfo)
            axios.post(`https://care-box-backend.herokuapp.com/api/v1/applicant_test/`, addAuthorInfo).then(res => console.log(res));
            // fetch('https://care-box-backend.herokuapp.com/api/v1/applicant_test/', {
            //     method: 'POST', // or 'PUT'

            //     body: addAuthorInfo,
            // })
            //     .then(response => response.json())
            //     .then(data => console.log(data))
            //     .catch(err => console.error(err));
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>
                Add Author
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
                    {authorInfo && authorInfo.map(author => <Item key={author.id} item={author} />)}
                </tbody>
            </Table>

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
