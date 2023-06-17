import React, { FC, ReactElement, useRef, useEffect, useState, ChangeEvent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CreateNoteDto, Client, NoteLookupDto, NoteDetailsVm } from '../api/api';
import { FormControl } from 'react-bootstrap';
import { create } from 'domain';
import '../App.css';
import {IoCloseCircleSharp, IoHammerSharp} from "react-icons/io5";

const apiClient = new Client('https://localhost:44397');

const NoteDetails = ({
    noteId
    }: {
    noteId: string | undefined
}) => {

    const [note, setNote] = useState<NoteDetailsVm>();
  
    async function getNote() {
        const NoteDetailsVm = await apiClient.get(noteId || '', '1.0');
        console.log('Received NoteDetailsVm:', NoteDetailsVm);
        setNote(NoteDetailsVm);
    }

    useEffect(() => {
        console.log('Calling getNote()');
        setTimeout(getNote, 500);
    }, []);

    console.log('Rendering Info component');

    return (
        <div>
            <div>
		  	    {/* <div className="details">ID: {note?.id}</div> */}
                <h3 className="details">Title: {note?.title}</h3>
                <div className="details">Details: {note?.details}</div>
                <span className="creation-date">Creation Date: {note?.creationDate?.toLocaleString()}</span>
                <span className="edit-date">Edit Date: {note?.editDate?.toLocaleString()}</span>
            </div> 
        </div>
    );
};

export default NoteDetails;