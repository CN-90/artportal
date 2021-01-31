import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faEnvelope,
  faPlus,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

import { clearProfile, getUserProfile } from '../../actions/userActions';
import { setProfile } from './../../actions/userActions';

import ImageGrid from './../../components/imageGrid/ImageGrid';
import PostModal from './../../components/postModal/PostModal';
import './Profilepage.scss';

const Profilepage = (props) => {
  const dispatch = useDispatch();
  const [ownProfile, setOwnProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let { loading, error, profile } = useSelector((state) => state.userProfile);
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();

  useEffect(() => {
    if (props.match.params.id === userInfo._id) {
      setOwnProfile(true);
    }
    dispatch(getUserProfile(props.match.params.id));
    return () => {
      dispatch(clearProfile());
    };
  }, [props.match.params, userInfo, dispatch]);

  const handleButtonNavigation = () => {
    console.log(props);
    history.push(`${props.location.pathname}/settings`);
  };

  return (
    <main className="profilepage">
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>Sorry error alert</h1>
      ) : (
        <>
          {showModal ? <PostModal toggleModal={setShowModal} /> : null}
          <section className="usercard">
            <div className="usercard_banner">
              <img src={profile.bannerImage.imageUrl} alt="" />
            </div>
            <div className="usercard_left">
              <div className="usercard_img-ctn">
                <img src={profile.userImage.imageUrl} alt="" />
              </div>
            </div>
            <div className="usercard_right">
              <h1 className="usercard_name">{profile.username}</h1>
              <h4 className="usercard_bio">{profile.bio}</h4>
              <h4 className="usercard_followers">
                {profile.followers.length} Followers
              </h4>
              <div className="btn-container">
                {ownProfile ? (
                  <>
                    <button onClick={() => setShowModal((s) => !s)}>
                      <FontAwesomeIcon
                        className="userIcon"
                        size="1x"
                        icon={faPlus}
                      />
                      <span>Create Post</span>
                    </button>
                    <button onClick={handleButtonNavigation}>
                      <FontAwesomeIcon
                        className="userIcon"
                        size="1x"
                        icon={faCog}
                      />
                      <span>Settings</span>
                    </button>
                  </>
                ) : (
                  <>
                    {' '}
                    <button>
                      <FontAwesomeIcon
                        className="userIcon"
                        size="1x"
                        icon={faUserPlus}
                      />
                      <span>Follow</span>
                    </button>
                    <button>
                      <FontAwesomeIcon
                        className="userIcon"
                        size="1x"
                        icon={faEnvelope}
                      />
                      <span>Message</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
          <section className="userposts">
            <ImageGrid posts={profile.posts} profilePage={true} />
          </section>
        </>
      )}
    </main>
  );
};

export default Profilepage;
