import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

import configs from './configs';

const s3 = new AWS.S3({
  accessKeyId: configs.aws_access,
  secretAccessKey: configs.aws_secret,
  region: 'ap-northeast-2',
});
// 프로필 이미지
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'sockettalk/userdata/avatars',
  }),
});
// 배경 이미지
const multerBackground = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'sockettalk/userdata/backgrounds',
  }),
});
export const uploadAvatar = multerAvatar.single('avatar');
export const uploadBackground = multerBackground.single('background');
