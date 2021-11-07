import React from 'react'
import { Button } from 'react-bootstrap';

function Item({ item }) {
    const { Author_Name, Description, Email, Phone, Title } = item;
    return (
        <tr>
            <td>{Title}</td>
            <td>{Author_Name}</td>
            <td>{Phone}</td>
            <td>{Email}</td>
            <td>{Description}</td>
            <td>
                <Button>
                    Edit
                </Button>
            </td>
        </tr>
    )
}

export default Item
