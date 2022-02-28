const getCurrentUser = () => {
  const userAsString = localStorage.getItem("user");
  if (userAsString) {
    return JSON.parse(userAsString);
  }

  return null;
};

const setCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const setAllSubs = (subs) => {
  localStorage.setItem("allSubsciptions", JSON.stringify(subs));
}

const getAllSubs = () => {
  const subsAsString = localStorage.getItem("allSubsciptions");
  if(subsAsString){
    return JSON.parse(subsAsString)
  }
}
const initialState = {
  id: getCurrentUser()?.userDetails.id,
  currentUser: getCurrentUser(),
  allSubscriptions: getAllSubs(),

};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ID":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_CURRENT_USER":
      const user = action.payload;
      setCurrentUser(user);
      return {
        ...state,
        currentUser: user,
      };
    case "CLEAR_REDUCER":
      return {
        id: action.payload,
        currentUser: action.payload,
      };
      case "SET_ALL_SUBS":
        setAllSubs(action.payload)
        return {
          ...state,
          allSubscriptions: action.payload,
        };
    default:
      return state;
  }
};

export default userReducer;
