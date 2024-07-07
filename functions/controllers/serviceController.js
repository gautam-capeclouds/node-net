const Client = require('../models/Client');
const cloudinary = require('../utils/cloudinary');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

exports.getServices = async (req, res) => {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: 'Missing slug parameter' });
  }

  try {
    const userdetail = await Client.find({ serviceType: slug });
    if (!userdetail.length) {
      return res.status(404).json({ message: 'No matching services found' });
    }
    return res.status(200).json({ data: userdetail });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// exports.registerDetails = async (req, res) => {
//   const data = req.body;
//   const { firstName = 'default_user' } = data;

//   if (req.files.profilePicture) {
//     const profilePicture = await cloudinary.uploader.upload(req.files.profilePicture[0].path, {
//       folder: `${firstName}/profile_picture`,
//       transformation: [{ quality: 'good' }],
//     });
//     data.profile_picture = profilePicture.secure_url;
//   }

//   if (req.files.coverPicture) {
//     const coverPicture = await cloudinary.uploader.upload(req.files.coverPicture[0].path, {
//       folder: `${firstName}/cover_picture`,
//       transformation: [{ quality: 'good' }],
//     });
//     data.cover_picture = coverPicture.secure_url;
//   }

//   const additionalImages = req.files.images || [];
//   const imageUrls = [];
//   for (const image of additionalImages) {
//     const uploadResult = await cloudinary.uploader.upload(image.path, {
//       folder: `${firstName}/additional_images`,
//       public_id: `image_${additionalImages.indexOf(image) + 1}`,
//       transformation: [{ quality: 'good' }],
//     });
//     imageUrls.push(uploadResult.secure_url);
//   }
//   data.images = imageUrls;

//   try {
//     const result = await Client.create(data);
//     return res.status(201).json({ status: 'success', data: result._id });
//   } catch (error) {
//     return res.status(500).json({ status: 'error', message: error.message });
//   }
// };

exports.registerDetails = async (req, res) => {
  const data = req.body;
  const { firstName = 'default_user' } = data;

  const uploadImages = async (files, folder) => {
    const imageUrls = [];
    for (const image of files) {
      const uploadResult = await cloudinary.uploader.upload(image.path, {
        folder: `${firstName}/${folder}`,
        public_id: `image_${files.indexOf(image) + 1}`,
        transformation: [{ quality: 'good' }],
      });
      imageUrls.push(uploadResult.secure_url);
    }
    return imageUrls;
  };

  try {
    let profilePictureUrl, coverPictureUrl, imageUrls;

    if (req.files && req.files.profilePicture) {
      profilePictureUrl = await uploadImages(req.files.profilePicture, 'profile_picture');
    }

    if (req.files && req.files.coverPicture) {
      coverPictureUrl = await uploadImages(req.files.coverPicture, 'cover_picture');
    }

    if (req.files && req.files.images) {
      imageUrls = await uploadImages(req.files.images, 'additional_images');
    }

    data.profile_picture = profilePictureUrl ? profilePictureUrl[0] : null; // Assuming single profile picture
    data.cover_picture = coverPictureUrl ? coverPictureUrl[0] : null;
    data.images = imageUrls || [];

    const result = await Client.create(data);
    return res.status(201).json({ status: 'success', data: result._id });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};
