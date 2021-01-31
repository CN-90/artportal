import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import './Settingspage.scss';

const Settingspage = () => {
  const { userInfo } = useSelector((s) => s.userLogin);
  const dispatch = useDispatch();
  const [updatedFields, setUpdatedFields] = useState({
    bio: userInfo.bio,
    website: userInfo.website || '',
  });
  const [userImage, setUserImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...updatedFields, userImage, bannerImage }));
  };

  const updatedFieldsHandler = (e) => {
    setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
  };

  const uploadFileHandler = (e) => {
    if (e.target.name === 'userImage') {
      setUserImage(e.target.files[0]);
    } else {
      setBannerImage(e.target.files[0]);
    }
  };

  return (
    <section className="settings">
      <h1 className="settings_primary-header">Settings</h1>
      <div className="settings_header">
        <img src={userInfo.userImage.imageUrl} alt="" />
        <h1 className="settings_header-username">{userInfo.username}</h1>
      </div>
      <div className="settings_form-ctn">
        <form onSubmit={onSubmitHandler}>
          <div className="formgroup">
            <label htmlFor="Change User Image">Change User Image</label>
            <input
              onChange={uploadFileHandler}
              type="file"
              name="userImage"
              id=""
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="formgroup">
            <label htmlFor="Change User Image">Change Profile Banner</label>
            <input
              onChange={uploadFileHandler}
              type="file"
              name="bannerImage"
              id=""
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="formgroup">
            <label htmlFor="Change User Image">Bio</label>
            <textarea
              onChange={updatedFieldsHandler}
              value={updatedFields.bio}
              cols="10"
              rows="5"
              name="bio"
              id=""
            />
          </div>
          <div className="formgroup">
            <label htmlFor="Users Website">Website</label>
            <input
              onChange={updatedFieldsHandler}
              value={updatedFields.website}
              type="text"
              name="website"
              id=""
            />
          </div>

          <div className="formgroup flex">
            <label htmlFor="Change User Image">Accepting Commisions</label>
            <input type="checkbox" name="commisions" id="" />
          </div>
          <button>Update Information</button>
        </form>
      </div>
    </section>
  );
};

export default Settingspage;
