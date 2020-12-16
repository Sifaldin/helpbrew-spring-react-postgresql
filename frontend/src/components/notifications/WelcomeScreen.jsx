import { IoMdCloseCircle } from "react-icons/io";
import { SiSkillshare } from "react-icons/si";
import { IoMdGift } from "react-icons/io";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { SiMinds } from "react-icons/si";

export default function WelcomeScreen({ setDisplayError, seenPopup = null }) {
  return (
    <div className="error-wrapper welcome">
      <div className="modal-backdrop">
        <div className="modal-box welcome">
          <div className="modal-icon">
            <IoMdCloseCircle
              color="lightblue"
              onClick={() => {
                setDisplayError(false);
                if (seenPopup) seenPopup();
              }}
            />
          </div>

          <div className="error-body welcome">
            <span>Welcome to HelpBrew!</span>
            <p className="welcome-par">
              HelpBrew is a collaborative tool where you can interact with other
              like minded individuals. The platform offers three different kinds
              of services.
            </p>
            <ul className="service-list">
              <li>
                <SiSkillshare style={{ fontSize: "70px" }} />
                <p>
                  The first is 'Skills', where you can request or give a short
                  tutorial or a coaching session with a particular skill that
                  you are interested in.
                </p>
              </li>
              <li>
                <IoMdGift style={{ fontSize: "70px" }} />
                <p>
                  The secondly is 'Giveaways' service. It helps you to give or
                  recieve tangible materials that may aid in your learning like
                  books, videos, software and the like.
                </p>
              </li>
              <li>
                <RiMoneyEuroCircleLine style={{ fontSize: "70px" }} />
                <p>
                  Last but not least is 'Monetary Support' service where you can
                  share or recieve information on scholarships, grants and funds
                  and even directly request donations.
                </p>
              </li>
            </ul>
            <div className="instructions">
              <SiMinds style={{ fontSize: "50px", color: "#ff75ac" }} />
              <p>
                Go ahead and look through the posts that have already been
                published by others. Or why not create a post yourself! We hope
                that Personal Dashboard and Direct Messages will be great tools
                for you to track your exchanges with others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
