export default function CategoryBox({ category, posts }) {
  return (
    <div className="category-box">
      <h2>category</h2>
      <ul className="items">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <span>{post.body}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
