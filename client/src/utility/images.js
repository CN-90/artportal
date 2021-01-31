import axios from 'axios';

export const uploadIconPhoto = async (userImage, user) => {
  let form = new FormData();
  form.append('image', userImage);

  return await axios.post(`/api/image-upload/${user._id}`, form, {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`,
    },
  });
};

export const uploadBannerPhoto = async (userImage, user) => {
  let form = new FormData();
  form.append('image', userImage);

  return await axios.post(`/api/image-upload/${user._id}/banner`, form, {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`,
    },
  });
};
