import { take, put, call, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  billCreated,
  billsLoaded,
  billUpdated,
  billDeleted
} from "../actions/bill";
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
      .orderBy("createdAt", "desc")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        return data;
      })
  );

  yield put(billsLoaded(bills));
}

export function* doUpdateBill(action) {
  yield call(() =>
    firebase
      .firestore()
      .collection("bills")
      .doc(action.id)
      .update({ ...action.payload, updatedAt: new Date() })
      .then(response => response)
      .catch(err => alert(JSON.stringify(err)))
  );

  yield put(billUpdated());
}

export function* doDeleteBill(action) {
  yield call(() =>
    firebase
      .firestore()
      .collection("bills")
      .doc(action.id)
      .delete()
      .then(response => response)
      .catch(err => alert(JSON.stringify(err)))
  );

  yield put(billDeleted());
}

export function* doSubscribeBills(action) {
  const channel = new eventChannel(emiter => {
    const listener = firebase
      .firestore()
      .collection("bills")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        emiter({ data });
      });
    return () => {
      listener.off();
    };
  });
  while (true) {
    const { data } = yield take(channel);
    yield put(billsLoaded(data));
  }
}

export default function* billService() {
  yield takeEvery("CREATE_BILL", doCreateBill);
  yield takeEvery("UPDATE_BILL", doUpdateBill);
  yield takeEvery("DELETE_BILL", doDeleteBill);
  yield takeEvery("LOAD_BILLS", doLoadBills);
  yield takeEvery("SUBSCRIBE_BILLS", doSubscribeBills);
}
