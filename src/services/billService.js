import { put, call, takeEvery } from "redux-saga/effects";
import { billCreated, billsLoaded } from "../actions/bill";
import firebase from "react-native-firebase";

export function* doCreateBill(action) {
  yield call(() =>
    firebase
      .firestore()
      .collection("bills")
      .add({ ...action.formData, createdAt: new Date() })
      .then(response => response)
      .catch(err => alert(JSON.stringify(err)))
  );

  yield put(billCreated());
}

export function* doLoadBills(action) {
  const bills = yield call(() =>
    firebase
      .firestore()
      .collection("bills")
      // .where("createdAt", ">=", new Date().getTime() - 5000)
      .orderBy("createdAt", "asc")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data)
        return data;
      })
  );

  yield put(billsLoaded(bills));
}

export default function* memberService() {
  yield takeEvery("CREATE_BILL", doCreateBill);
  yield takeEvery("LOAD_BILLS", doLoadBills);
}
