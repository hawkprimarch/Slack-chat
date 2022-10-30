import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup.string().min(3).max(12).required(),
  password: yup.string().min(3).max(12).required(),
});

export default loginSchema;
