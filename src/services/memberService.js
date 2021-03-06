import { put, call, takeEvery, select } from "redux-saga/effects";
import {
  sendVerificationCodeLoaded,
  verifyVerificationCodeLoaded
} from "../actions/member";
import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";

export function* loadSendVerificationCode({ phoneNumber }) {
  const confirmResult = yield call(() =>
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => confirmResult)
      .catch(err =>
        alert(
          `${err.userInfo.error_name}: ${err.userInfo.NSLocalizedDescription}`
        )
      )
  );
  yield put(sendVerificationCodeLoaded(confirmResult));
}

export function* loadVerifyVerificationCode({ verificationCode }) {
  const confirmResult = yield select(({ member }) => member.confirmResult);
  const userData = yield call(() =>
    confirmResult
      .confirm(verificationCode)
      .then(userData => {
        setTimeout(() => {
          userData.phoneNumber && Actions.home();
        }, 1000);
        return userData;
      })
      .catch(err =>
        alert(
          `${err.userInfo.error_name}: ${err.userInfo.NSLocalizedDescription}`
        )
      )
  );
  yield put(verifyVerificationCodeLoaded(userData));
}

export default function* memberService() {
  yield takeEvery("SEND_VERIFICATION_CODE", loadSendVerificationCode);
  yield takeEvery("VERIFY_VERIFICATION_CODE", loadVerifyVerificationCode);
}
