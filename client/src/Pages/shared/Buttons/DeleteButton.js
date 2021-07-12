import React, { useState } from 'react'
import { connect } from 'react-redux'

import ConfirmModal from '../ConfirmModal';
import { deleteRecipe } from '../../../actions';

export const DeleteButton = (props) => {
    const {title, id, deleteRecipe} = props;

    const [deleteModal, setDeleteModal] = useState(false);

    const onConfirm = async () => {
        const response = await deleteRecipe(id);

        setDeleteModal(false);
    };

    return (
        <>
        <button onClick={() => setDeleteModal(true)} className='btn bg-red-600' >
            Delete
        </button>
        {deleteModal ? 
            <ConfirmModal
            label='Delete'
            confirmQuestion={`Are you sure you want to delete the Recipe with the Title "${title}"?`}
            onEscape={() => setDeleteModal(false)}
            onConfirm={onConfirm}
            firstBtnText='Delete'
            firstBtnColor='bg-red-500'
            secondBtnText='Cancel'
            secondBtnColor='bg-primary'
            />:null}
        </>
    );
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    deleteRecipe
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
