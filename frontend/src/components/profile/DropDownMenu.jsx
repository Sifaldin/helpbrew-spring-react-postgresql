import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CSSTransition } from "react-transition-group";
import { RiDoorOpenLine } from "react-icons/ri";
import MessageNotification from "./MessageNotification";
import ChatApi from "../../api/ChatApi";
import Api from "../../api/Api";
import { Link } from "react-router-dom";
import Auth from "../../services/Auth";
import ProfileImageUploader from "./ProfileImageUploader";
import ImageEditMenu from "./ImageEditMenu";

function DropDownMenu({ user, setUser }) {
  const [threads, setThreads] = useState([]);
  const [open, setOpen] = useState(true);
  const [activeMenu, setactiveMenu] = useState("main");

  const [imgUrl, setImgUrl] = useState("");

  const [showImageEdit, setShowImageEdit] = useState(false);

  //Callback function that will send a user update call to the server
  const updateUser = () => {
    const img = { ...user, imageUrl: imgUrl };
    Api.put("/user/me", img).then((res) => setUser(res.data));
  };

  useEffect(() => {
    const getThreads = async () => {
      const response = await ChatApi.getAllThread();
      setThreads(response.data);
    };
    getThreads();
  }, []);

  const onLogout = () => Auth.logout();

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item">
        <span className="icon-botton">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div>
      <div>
        {open ? (
          <div className="dropdown">
            <CSSTransition
              in={activeMenu === "main"}
              unmountOnExit
              timeout={500}
              classNames="menu-primary"
            >
              <div className="menu">
                <a href="#" onClick={() => setShowImageEdit(true)}>
                  <img
                    style={{ height: "70px", width: "70px" }}
                    className={"profileImg"}
                    src={user.imageUrl}
                  />
                  Change profile image
                </a>

                <Link
                  className="link-display"
                  to="/user"
                  onClick={() => setOpen(!open)}
                >
                  <DropdownItem>My Profile</DropdownItem>
                </Link>
                <Link
                  className="link-display"
                  to="/chat"
                  onClick={() => setOpen(!open)}
                >
                  <DropdownItem>Messages</DropdownItem>
                </Link>
                <Link className="link-display" onClick={onLogout}>
                  <DropdownItem>Log Out</DropdownItem>
                </Link>

                {/* <DropdownItem leftIcon={<CgProfile/>}></DropdownItem> */}
              </div>
            </CSSTransition>

            {/* <CSSTransition
                in={activeMenu === 'messages'}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
            >
                <div className="menu">
                    {history}
                     <DropdownItem leftIcon={<BiMessageSquareDetail size="40px" />}>
                         <Thread />
                    </DropdownItem>
                    <MessageNotification />
                    {
                        threads.map(thread => (
                            <MessageNotification key={thread.id} thread={thread}  />
                        ))
                    }
                     </div>
            </CSSTransition> */}
          </div>
        ) : null}
      </div>
      <div>
        {showImageEdit ? (
          <ImageEditMenu
            user={user}
            setUser={setUser}
            setShowImageEdit={setShowImageEdit}
          />
        ) : null}
      </div>
    </div>
  );
}

export default DropDownMenu;
