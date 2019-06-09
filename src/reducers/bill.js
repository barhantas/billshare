export default function userReducer(
  state = {
    billCreating: false,
    billUpdating: false,
    billDeleting: false,
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
    case "UPDATE_BILL": {
      return {
        ...state,
        billUpdating: true
      };
    }
    case "BILL_UPDATED": {
      return {
        ...state,
        billUpdating: false
      };
    }
    case "DELETE_BILL": {
      return {
        ...state,
        billDeleting: true
      };
    }
    case "BILL_DELETED": {
      return {
        ...state,
        billDeleting: false
      };
    }
    default:
      return state;
  }
}
