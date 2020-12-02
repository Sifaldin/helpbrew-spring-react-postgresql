import React ,{forwardRef, useImperativeHandle, useState} from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'
import { IoMdCloseCircle } from 'react-icons/io';

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
                        <IoMdCloseCircle onClick={() => ref.current.close()} />
                        </div>
                        <div className="modal-body">
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
                                Give
                            </Link>
                            --------------------
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
                                request
                            </Link>
                        </div>
                </div>
                
                {props.children}

            </div>, document.getElementById("modal-root")
            ))
    }
    return null;
})

export default Modal
