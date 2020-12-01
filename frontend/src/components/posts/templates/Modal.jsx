import React ,{forwardRef, useImperativeHandle, useState} from 'react'
import ReactDom from 'react-dom'
import { NavLink } from 'react-router-dom'
import { IoMdCloseCircle } from 'react-icons/io';
import Ask from '../../../Images/Ask-for-help.jpg'


const Modal = forwardRef( (props, ref) => {
    
    const [display, setDisplay] = useState(true);

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

    if (display) {
        return (

            ReactDom.createPortal(
            <div className={"modal-wrapper"}>
                <div onClick={close} className={"modal-backdrop"} />
                    
                <div className={"modal-box"}>
                    <div className="modal-icon">
                        <IoMdCloseCircle onClick={() => ref.current.close()} />
                        </div>
                        <div className="modal-body">
                            <NavLink exact to="posts/newGiverPost" onClick={() => ref.current.close()}>
                            Give{/* <img src={Ask} alt=""/> */}
                        </NavLink>
                        --------------------
                        <NavLink exact to="Posts/newRequestPost" onClick={() => ref.current.close()}>
                            Request
                        </NavLink>
                        </div>
                </div>
                
                {props.children}

            </div>, document.getElementById("modal-root"))
   

    
        
    )
    }
    return null;
})

export default Modal
