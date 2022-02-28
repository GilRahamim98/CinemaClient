const setId = (id) => {
    return {
        type: 'SET_ID',
        payload: id
    }
}

const setCurrentUser = (user) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: user
    }
}

const clearReducer = (clear) => {
    return {
        type: 'CLEAR_REDUCER',
        payload: clear
    }
}

const setAllSubscriptions = (subscriptions) => {
    return {
        type: 'SET_ALL_SUBS',
        payload: subscriptions
    }
}

export {setId, setCurrentUser, clearReducer, setAllSubscriptions};
