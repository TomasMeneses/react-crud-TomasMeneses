import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

import  api  from "../../services/employee"

import './styles.css'


const DeleteModal = ({ isShowingDeleteModal, toggleDeleteModal, children }) => { 
  useEffect(() => {
    const listner = function (e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();

        isShowingDeleteModal && toggleDeleteModal();
      }
    }

    window.addEventListener('keyup', listner)

    return (() => {
      window.removeEventListener('keyup', listner)
    })

  }, [isShowingDeleteModal, toggleDeleteModal])

  return (
    isShowingDeleteModal ? ReactDom.createPortal(
      <div className="modal-delete-overlay">
        <div className="modal-delete-wrapper">
          <div className="modal-delete">
            {children}
          </div>
        </div>
      </div>, document.body
    ) : null
  )
}



export const DeleteModalHeader = () => (
    <div className="modal-delete-header">
        Are you sure you want to delete ?
    </div>
)

export const DeleteModalBody = ({ toggleDeleteModal, employeeId, listFunction }) => {
  
  const handleSaveEmployee = async (event) => {
    try {
      console.log('asdasd')
      if(employeeId){
        
        const response = await api.delete(employeeId);
      }
      listFunction();
      toggleDeleteModal();

    }catch(error) {
      console.log(error);
      toggleDeleteModal();
    }

  }
  
  return(
    <div className="modal-delete-body">
        <button onClick={handleSaveEmployee}>
          Yes
        </button>
        <button onClick={toggleDeleteModal}>
          Cancel
        </button>
    </div>
)}



export const useDeleteModal = () => {
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);

  function toggleDeleteModal() {
    setIsShowingDeleteModal(!isShowingDeleteModal);
  }

  return {
    isShowingDeleteModal,
    toggleDeleteModal,
  }
}

export default DeleteModal;