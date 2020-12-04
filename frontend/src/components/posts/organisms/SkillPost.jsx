import Comments from "../../comments/templates/Comments";
import { useNotification } from "../../notifications/NotificationProvider";

//Displays post belonging to skills category.
export default function SkillPost({
  post,
  handleUpdateClick,
  deletePost,
  user,
}) {
  //Notification Creator
  const dispatch = useNotification();
  const handleDeleteNotification = () => {
    dispatch({
      type: "ERROR",
      message: "Deleting Post!",
    });
  };

  console.log(post);
  return (
    <div className="single-post">
      <div className="post-pic">
        <img src={post.imageUrl} alt="Single post img" />
      </div>
      <div className="single-post-card">
        <div className="left">
          <div className="main">
            <div className="post-info">
              <div className="signature">
                <div className="profile-icon">
                  <img src={post.user.imageUrl} alt="Single post img" />
                </div>
                <span className="user-name">{post.user.name}</span>
              </div>

              <h3>{post.title}</h3>
              <p>{post.body}</p>

              {/* The post is deleted only if the email of the logged in user and 
        email of the user who wrote the post are the same */}

              {/* !!NB: This block of code will be the same for GiveawayPost and MonetarySupoprtPost.
        It would be good to refactor the block and put it one level above(for example, in 
          delete function in SinglePost component) to avoid code duplication
        */}
              {post.user.email === user.email ? (
                <div>
                  <button
                    className="medium-button"
                    onClick={() => deletePost()}
                  >
                    Delete
                  </button>

                  <button className="medium-button" onClick={handleUpdateClick}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
            <Comments post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}
