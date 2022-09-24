export default function reducer(state = {
    userData: {
        id: '',
        Name: '',
        email: '',
        careerField: '',
        mobile: '',
    }
}, action) {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                userData: action.payload
            };
        case "Logout":
            return {
                ...state,
                userData: {
                    id: '',
                    Name: '',
                    email: '',
                    careerField: '',
                    mobile: '',
                }
            };
        default:
            return state;
    }
}