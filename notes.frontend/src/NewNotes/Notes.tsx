import React, { FC, ReactElement, useRef, useEffect, useState, ChangeEvent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CreateNoteDto, Client, NoteLookupDto, NoteDetailsVm } from '../api/api';
import { FormControl } from 'react-bootstrap';
import { create } from 'domain';
import '../App.css';
import {AiFillCloseSquare} from 'react-icons/ai'
import Note from './Note';
import NoteCreate from './NoteCreate'

const apiClient = new Client('https://localhost:44397');

const Notes = () => {
    const [notes, setNotes] = useState<NoteLookupDto[] | undefined>(undefined);
  
    async function getNotes() {
        const noteListVm = await apiClient.getAll('1.0');
        console.log('Getting Notes!');
        setNotes(noteListVm.notes);
    }
  
    useEffect(() => {
      setTimeout(getNotes, 500);
    }, []);
  
    return (
        <div>
            <div className="notes">
                {notes?.map(note => (
                    <div>
                        <Note key={note.id} note={note} setNotes={setNotes} notes={notes} />
                    </div>
                ))}
            </div>
            <div className="add-notes">
                <NoteCreate setNotes={setNotes} notes={notes}/>
            </div>
        </div>
    );
  };
  
  export default Notes;