
import React ,{forwardRef, useImperativeHandle, useState} from 'react'
import ReactDom from 'react-dom';
import { IoMdCloseCircle } from 'react-icons/io';




const ConfirmModal = forwardRef( ({handleConfirm}, ref) => {
    const [display, setDisplay] = useState(false);

    

    useImperativeHandle(ref, () => {
        return{
            openModal: () => open(),
            close: () => close()
        }
    })

    const open = () => {
        setDisplay(true)
    }
    const close = () => {
        setDisplay(false)
        
    }
 
    function onClick() {
        handleConfirm();
        ref.current.close();
    }

    if (display) {
        return (

            ReactDom.createPortal(
            <div className={"modal-wrapper"}>
                  <div onClick={close} className={"modal-backdrop"} />
                    
                <div className={"modal-box"}>
                      <div className="modal-icon" onClick={() => ref.current.close()} >
                          <IoMdCloseCircle color="lightblue" />
                      </div>
                        <div className="confirm-modal-body">
                            <div className= "confirm-msg">
                            
                            <p>Are you sure you want to delete this post?</p>
                            </div>
                             <div className= "btn-wrapper">
                              <button className="yes-no-btn" onClick={onClick}>Yes</button>
                              <button className="yes-no-btn" onClick={() => ref.current.close()}>No</button>
                             </div>
                        </div>
                </div>
                         
            </div>, document.getElementById("modal-root")
            ))
    }
    return null;
})

export default ConfirmModal
                

            

