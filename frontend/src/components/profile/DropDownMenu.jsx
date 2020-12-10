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
import { RiDashboardLine } from "react-icons/ri";

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

  function DisplayItem(props) {
    return (
      <a href="#" className="menu-item">
        <span className="icon-botton">{props.leftIcon}</span>
        {props.children}
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
                <Link
                  className="link-display"
                  to="#"
                  onClick={() => setShowImageEdit(true)}
                >
                  <DisplayItem
                    leftIcon={
                      <img
                        src={user.imageUrl}
                        alt="profile-pic"
                        style={{
                          height: "35px",
                          width: "35px",
                          borderRadius: "20px",
                          marginRight: "5px",
                        }}
                      />
                    }
                  >
                    Change profile picture
                  </DisplayItem>
                </Link>

                <Link
                  className="link-display"
                  to="/"
                  onClick={() => setOpen(!open)}
                >
                  <DisplayItem leftIcon={<RiDashboardLine size="40px" />}>
                    Dashboard
                  </DisplayItem>
                </Link>

                <Link
                  className="link-display"
                  to="/chat"
                  onClick={() => setOpen(!open)}
                >
                  <DisplayItem leftIcon={<BiMessageSquareDetail size="40px" />}>
                    Messages
                  </DisplayItem>
                </Link>
                <Link className="link-display" onClick={onLogout}>
                  <DisplayItem leftIcon={<RiDoorOpenLine size="40px" />}>
                    Log Out
                  </DisplayItem>
                </Link>

                {/* <DisplayItem leftIcon={<CgProfile/>}></DisplayItem> */}
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
