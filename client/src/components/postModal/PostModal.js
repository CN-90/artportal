import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import './PostModal.scss';
import { createPost } from './../../actions/postActions';
import { useDispatch } from 'react-redux';

const PostModal = ({ toggleModal }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const onClickHandler = () => {
    toggleModal(false);
  };

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const uploadHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ title, image }));
  };

  return (
    <section className="postmodal">
      <div className="postmodal_header">
        <div>
          <h1>CREATE POST</h1>
        </div>
        <div onClick={onClickHandler}>
          <FontAwesomeIcon icon={faWindowClose} size="2x" color="#6868ff" />
        </div>
      </div>
      <div className="postmodal_form">
        <form onSubmit={onSubmitHandler}>
          <div className="formgroup">
            <label htmlFor="">Description</label>
            <textarea
              onChange={onChangeHandler}
              name="title"
              value={title}
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className="formgroup">
            <label htmlFor="">File</label>
            <input
              onChange={uploadHandler}
              name="image"
              type="file"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="postmodal_btn-ctn">
            <button className="blue-btn">Create Post</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostModal;
