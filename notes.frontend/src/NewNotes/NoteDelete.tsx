import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import { CreateNoteDto, Client, NoteLookupDto } from '../api/api';
import { FormControl } from 'react-bootstrap';
import { create } from 'domain';

const apiClient = new Client('https://localhost:44397');

const DeleteNote = ({ someProp }: { someProp: string | undefined}) => {
    console.log('Calling Info');
  
    async function delNote( someProp: string | undefined) {
        const NoteDetailsVm = await apiClient.delete(someProp || '', '1.0');
        console.log('Received NoteDetailsVm:', NoteDetailsVm);
    }

    delNote(someProp);
};

export default DeleteNote;