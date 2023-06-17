import React, { FC, ReactElement, useRef, useEffect, useState, ChangeEvent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CreateNoteDto, Client, NoteLookupDto, NoteDetailsVm, UpdateNoteDto } from '../api/api';
import { FormControl } from 'react-bootstrap';
import { create } from 'domain';
import '../App.css';
import {IoCloseCircleSharp, IoHammerSharp} from "react-icons/io5";

const apiClient = new Client('https://localhost:44397');

const NoteEdit = ({
    noteId,
    setNotes,
    notes
    }: {
    noteId: string | undefined,
    setNotes: React.Dispatch<React.SetStateAction<NoteLookupDto[] | undefined>>;
    notes: NoteLookupDto[] | undefined;
}) => {

    const [note, setNote] = useState<UpdateNoteDto>();
    const [titleCreate, setTitleCreate] = useState<string>('');
    const [detailsCreate, setDetailsCreate] = useState<string | undefined>(undefined);
    const formRef = useRef<HTMLFormElement>(null);
  
    async function getNotes() {
        const noteListVm = await apiClient.getAll('1.0');
        console.log('Getting Notes!');
        setNotes(noteListVm.notes);
    }

    async function getNote() {
        const NoteDetailsVm = await apiClient.get(noteId || '', '1.0');
        console.log('Received NoteDetailsVm:', NoteDetailsVm);
        setNote({
            id: NoteDetailsVm.id
        });
    }

    async function editNote() {
        console.log('Editing note', note);
        const NoteDetailsVm = await apiClient.update('1.0', note);
        console.log('Received NoteDetailsVm:', NoteDetailsVm);
        setTimeout(getNotes, 500);
    }

    useEffect(() => {
        console.log('Calling getNote()');
        setTimeout(getNote, 500);
        setTimeout(getNotes, 500);
    }, []);

    console.log('Rendering Info component');

    return (
        <div>
            <form ref={formRef}>
                <input placeholder="Title" className="title-input" onChange={(element) => {
                    setNote({
                        id: note?.id,
                        title: element.target.value,
                        details: note?.details
                    });
                    // setTitleCreate(element.target.value);
                }}/>
                <textarea placeholder="Details" className="details-input" onChange={(element) => {
                    setNote({
                        id: note?.id,
                        title: note?.title,
                        details: element.target.value
                    });
                    // setTitleCreate(element.target.value);
                }}/>
                <button type="button" className="edit-button" onClick={() => {
                    formRef.current?.reset();
                    editNote();
                }}
                >Изменить</button>
            </form> 
        </div>
    );
};

export default NoteEdit;