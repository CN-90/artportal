import React from 'react';
import './ImageGrid.scss';

const ImageGrid = ({ posts, profilePage }) => {
  posts = posts || [];
  return (
    <section className="img-grid">
      {posts.map((post) => (
        <div className="img-container">
          {profilePage ? null : (
            <div className="img-container-header">
              <img
                className="userImage"
                src={post.user.userImage.imageUrl}
                alt=""
              />
              <h1>{post.user.username}</h1>
            </div>
          )}
          <img src={post.image.imageUrl} alt="" />
        </div>
      ))}
    </section>
  );
};

export default ImageGrid;
