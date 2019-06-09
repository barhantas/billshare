export function sendVerificationCode(phoneNumber) {
  return {
    type: "SEND_VERIFICATION_CODE",
    phoneNumber: phoneNumber
  };
}

export function sendVerificationCodeLoaded(confirmResult) {
  return {
    type: "VERIFICATION_CODE_SENT",
    confirmResult: confirmResult
  };
}

export function verifyVerificationCode(verificationCode) {
  return {
    type: "VERIFY_VERIFICATION_CODE",
    verificationCode: verificationCode
  };
}

export function verifyVerificationCodeLoaded(userData) {
  return {
    type: "VERIFICATION_CODE_VERIFIED",
    userData: userData
  };
}
