export default function reducer(state = {
    userData: {
        id: 'jdgdfiugf',
        Name: 'Rahul Rajput',
        email: 'email@gmail.com'
    }
}, action) {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                userData: action.payload
            };
        case "DELETE_USER":
            return {
                ...state,
                userData: {
                    id: '',
                    Name: '',
                    email: ''
                }
            };
            default:
                return state;
    }
}