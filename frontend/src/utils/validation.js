import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('required_field'),
  password: yup.string().required('required_field'),
});

export const validateName = (existNames) => {
  const channelSchema = yup.object().shape({
    name: yup.string().notOneOf(existNames, 'should_be_uniq')
      .required('required_field'),
  });
  return channelSchema;
};

export const registrationSchema = yup.object().shape({
  username: yup.string('required_field').min(3, 'incorrect_symbols_count').max(20, 'incorrect_symbols_count').required('incorrect_symbols_count'),
  password: yup.string('required_field').min(6, 'min_6_symbols').required('min_6_symbols'),
  passwordConfirmation: yup.string().when('password', {
    is: (val) => (!!(val && val.length > 0)),
    then: yup.string().oneOf(
      [yup.ref('password')],
      'same_password',
    ),
  }),
});
