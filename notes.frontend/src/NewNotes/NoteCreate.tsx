import React, { FC, ReactElement, useRef, useEffect, useState, ChangeEvent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CreateNoteDto, Client, NoteLookupDto, NoteDetailsVm } from '../api/api';
import { FormControl } from 'react-bootstrap';
import { create } from 'domain';
import '../App.css';
import {IoCloseCircleSharp, IoHammerSharp} from "react-icons/io5";
import { waitFor } from '@testing-library/react';
import { title } from 'process';

const apiClient = new Client('https://localhost:44397');

const NoteCreate = ({
    setNotes,
    notes
  }: {
    setNotes: React.Dispatch<React.SetStateAction<NoteLookupDto[] | undefined>>;
    notes: NoteLookupDto[] | undefined;
  }) => {

    const [note, setNote] = useState<CreateNoteDto>();
    const [titleCreate, setTitleCreate] = useState<string>('');
    const [detailsCreate, setDetailsCreate] = useState<string | undefined>(undefined);
    const formRef = useRef<HTMLFormElement>(null);
  
    async function getNotes() {
        const noteListVm = await apiClient.getAll('1.0');
        console.log('Getting Notes!');
        setNotes(noteListVm.notes);
    }

    async function createNote() {
        console.log('Start Note creating.', titleCreate, detailsCreate);
        console.log('Seted Value.', note);
        await apiClient.create('1.0', note);
        console.log('Note is created.');
        setTimeout(getNotes, 500);
    }

    useEffect(() => {
        setTimeout(getNotes, 500);
    }, []);

    useEffect(() => {
        setNote({
            title: titleCreate,
            details: detailsCreate
        });
    }, [titleCreate]);

    useEffect(() => {
        setNote({
            title: titleCreate,
            details: detailsCreate
        });
    }, [detailsCreate]);

    return (
        <div>
            <form ref={formRef}>
                <input placeholder="Title" className="title-input" onChange={(element) => {
                    setTitleCreate(element.target.value);
                }}
                />
                <textarea placeholder="Details" className="details-input" onChange={(element) => {
                    setDetailsCreate(element.target.value);
                }}
                ></textarea>
                <button type="button" className="add-button" onClick={() => {
                    formRef.current?.reset();
                    createNote();
                }}
                >Добавить</button>
            </form> 
        </div>
    );
};

export default NoteCreate;
