export default function userReducer(
  state = {
    billCreating: false,
    bills: [],
    billsLoading: false
  },
  action
) {
  switch (action.type) {
    case "LOAD_BILLS": {
      return {
        ...state,
        billsLoading: true
      };
    }
    case "BILLS_LOADED": {
      return {
        ...state,
        billsLoading: false,
        bills: action.bills
      };
    }
    case "CREATE_BILL": {
      return {
        ...state,
        billCreating: true
      };
    }
    case "BILL_CREATED": {
      return {
        ...state,
        billCreating: false
      };
    }
    default:
      return state;
  }
}
