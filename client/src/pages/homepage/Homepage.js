import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageGrid from '../../components/imageGrid/ImageGrid';
import { getPosts } from '../../actions/postActions';
import './Homepage.scss';

const Homepage = () => {
  const { loading, posts, error } = useSelector((state) => state.postList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="homepage">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1 className="homepage_primary-header">Discovery</h1>
          <ImageGrid posts={posts} />{' '}
        </>
      )}
    </div>
  );
};

export default Homepage;
