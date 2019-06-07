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
