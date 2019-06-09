export function loadBills() {
  return {
    type: "LOAD_BILLS"
  };
}

export function billsLoaded(bills) {
  return {
    type: "BILLS_LOADED",
    bills
  };
}

export function createBill(formData) {
  return {
    type: "CREATE_BILL",
    formData
  };
}

export function billCreated() {
  return {
    type: "BILL_CREATED"
  };
}

export function updateBill(id, payload) {
  return {
    type: "UPDATE_BILL",
    id,
    payload
  };
}

export function billUpdated() {
  return {
    type: "BILL_UPDATED"
  };
}

export function deleteBill(id) {
  return {
    type: "DELETE_BILL",
    id
  };
}

export function billDeleted() {
  return {
    type: "BILL_DELETED"
  };
}

export function subscribeBills() {
  return {
    type: "SUBSCRIBE_BILLS"
  };
}
