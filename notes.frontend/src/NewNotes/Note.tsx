import React, { FC, ReactElement, useRef, useEffect, useState, ChangeEvent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CreateNoteDto, Client, NoteLookupDto, NoteDetailsVm } from '../api/api';
import { FormControl } from 'react-bootstrap';
import { create } from 'domain';
import '../App.css';
import {AiFillCloseSquare} from 'react-icons/ai'
import {IoCloseCircleSharp, IoHammerSharp} from "react-icons/io5";
import DeleteNote from './NoteDelete';
import NoteDetails from './NoteDetails';
import NoteEdit from './NoteEdit';

const apiClient = new Client('https://localhost:44397');

const Note = ({
    note,
    setNotes,
    notes
  }: {
    note: NoteLookupDto | undefined;
    setNotes: React.Dispatch<React.SetStateAction<NoteLookupDto[] | undefined>>;
    notes: NoteLookupDto[] | undefined;
  }) => {

    const [isOpen, setIsOpen] = useState<Boolean>();
    const [isEdit, setIsEdit] = useState<Boolean>();

    async function getNotes() {
        const noteListVm = await apiClient.getAll('1.0');
        console.log('Getting Notes!');
        setNotes(noteListVm.notes);
    }

    const handleDelete = (noteId: string | undefined) => {
        DeleteNote({ someProp: noteId });
        setTimeout(getNotes, 500);
    };

    const handleDetails = () => {
        if (isOpen && isEdit) {
            setIsEdit(!isEdit);
        }
        setIsOpen(!isOpen);
    }

    const handleEdit = () => {
        if (!isOpen) {
            setIsOpen(!isOpen);
        } 
        setIsEdit(!isEdit);
    }
  
    return (
        <div>
            <div className="container">
                <div 
                    className="note"
                    onClick={() => handleDetails()}
                >
                    {isOpen && (
                        <div>
                            <div className="note-details">
                                <NoteDetails noteId={note?.id} />
                            </div>
                        </div>
                    )}

                    {!isOpen && (
                        <h2 className="only-title">{note?.title}</h2>
                    )}
                </div>

                <div>
                    <div className="delete-icon">
                        <IoCloseCircleSharp
                            className="icon"
                            onClick={() => handleDelete(note?.id)}
                        />
                    </div>

                    <div className="edit-icon">
                        <IoHammerSharp 
                            onClick={() => handleEdit()}
                            className="icon" 
                        />
                    </div>
                </div>
            </div>
                {isOpen &&
                    <div className="tab"></div>
                }
                            {isEdit && (
                                <div className="note-edit">
                                    <NoteEdit noteId={note?.id} setNotes={setNotes} notes={notes}/>
                                </div>
                            )}
                {/* {isEdit &&
                    <div className="tab"></div>
                }                 */}
            <div>

            </div>
        </div>
    );
  };
  
  export default Note;