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
                        <IoMdCloseCircle color="lightblue" onClick={() => ref.current.close()} />
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
                                    <div className="give_ask"><RiHandHeartFill size="60px"/>Give </div> 
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
                                    <div className="give_ask"><FaHandsHelping size="60px"/>Ask For</div> 
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
