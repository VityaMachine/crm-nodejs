const userDataGetter = (user) => {
  const { id, username, email, firstName, secondName, birthday, user_role } =
    user;

  return { id, username, email, firstName, secondName, birthday, user_role };
};

module.exports = userDataGetter;
