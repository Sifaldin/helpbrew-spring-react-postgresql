//Displays post belonging to skills category.
export default function SkillPost({
  post,
  handleUpdateClick,
  deletePost,
  email,
}) {
  console.log(post);
  return (
    <div className="single-post-card">
      <div className="post-pic">
        <img  src={post.imageUrl} alt="Single post img" />
      </div>

      <div className="post-title">
        <h3 >{post.title}</h3>
        <p >{post.body}</p>

        {/* The post is deleted only if the email of the logged in user and 
        email of the user who wrote the post are the same */}

        {/* !!NB: This block of code will be the same for GiveawayPost and MonetarySupoprtPost.
        It would be good to refactor the block and put it one level above(for example, in 
          delete function in SinglePost component) to avoid code duplication
        */}
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
  );
}
