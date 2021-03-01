import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Alert, ProgressBar } from 'react-bootstrap';
import ProgressBarComponent from '../ProgressBar/index'


export const UploadForm = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg']

    const onFileUpload = (e) => {
        setError('');
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) setFile(selected)
        else {
            setFile(null)
            setError('Please select an image file(png or jpeg)');
        }
    }

    return (
        <div>
            {/* <Form>
                <Form.Group>
                    <Form.Control type="file" onChange={(e) => { onFileUpload(e) }} />
                    {error && <Alert variant="danger">{error}</Alert>}
                    {file && <div>{file.name}</div>}
                    {file && <ProgressBarComponent file={file} setFile={setFile} />}
                </Form.Group>
            </Form>asdsad */}
            <form>
                <label>
                    <input type="file" onChange={(e) => { onFileUpload(e) }} />
                    <span>+</span>
                </label>
                <div className="output">
                    {error && <div className="error">{error}</div>}
                    {file && <div>{file.name}</div>}
                    {file && <ProgressBarComponent file={file} setFile={setFile} />}
                </div>
            </form>
        </div>
    )
}


export default UploadForm;