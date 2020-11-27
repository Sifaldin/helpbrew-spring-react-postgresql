import CommentsPage from "../../comments/templates/Comments";

export default function SkillPost({
  post,
  handleUpdateClick,
  deletePost,
  email,
}) {
  console.log(post);
  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div id="pic-1">
                <img src={post.imageUrl} alt="Single post img" />
              </div>
            </div>
          </div>
          <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {post.email === email ? (
              <div>
                <button onClick={() => deletePost()}>Delete</button>

                <button onClick={handleUpdateClick}>Update</button>
              </div>
            ) : null}

            {/* <div className="action">
                {isPoster ? (
                  <button
                    className="singlePost-btn btn btn-default"
                    onClick={handleClaim}
                    type="button"
                  >
                    {post.claimed ? "Set Available" : "Set Claimed"}
                  </button>
                ) : null}
                {isPoster ? null : (
                  <button
                    className="singlePost-btn btn btn-default"
                    onClick={messageHandler}
                    type="button"
                  >
                    Message Poster
                  </button>
                )}
                <button className="like btn btn-default" type="button">
                  <span className="fa fa-heart"></span>
                </button>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
