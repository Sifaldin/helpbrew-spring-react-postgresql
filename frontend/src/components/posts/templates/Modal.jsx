import React ,{forwardRef, useImperativeHandle, useState} from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'
import { IoMdCloseCircle } from 'react-icons/io';
import { RiHandHeartFill } from 'react-icons/ri';
import { FaHandsHelping } from 'react-icons/fa';


const Modal = forwardRef( (props, ref) => {
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

    if (display) {
        return (

            ReactDom.createPortal(
            <div className={"modal-wrapper"}>
                <div onClick={close} className={"modal-backdrop"} />
                    
                <div className={"modal-box"}>
                    <div className="modal-icon">
                        <Link exact to="/">
                                <IoMdCloseCircle color="#ff75ac" onClick={() => ref.current.close() } />
                        </Link>
                        </div>
                        <div className="modal-body">

                            <h1>
                            <Link exact to=
                            {
                                {
                                    pathname: "/posts/give",
                                    state:
                                    {
                                        type:"give"
                                    }
                                }
                            }
                                onClick={() => ref.current.close()}>
                                    <div className="give_ask"><RiHandHeartFill color="#1e6fbf"/><p>Give</p>  </div> 
                            </Link>
                            </h1>
                            <h1>
                            <Link exact to=
                            {
                                {
                                    pathname: "/posts/request",
                                    state:
                                    {
                                        type: "request"
                                    }
                                }

                            }
                                onClick={() => ref.current.close()}>
                                    <div className="give_ask"><FaHandsHelping color="#1e6fbf" /><p>Ask For</p> </div> 
                            </Link>
                            </h1>
                        </div>
                        <div className="help">
                        <h1>HELP</h1>
                        </div>
                </div>
                
                {props.children}

            </div>, document.getElementById("modal-root")
            ))
    }
    return null;
})

export default Modal
