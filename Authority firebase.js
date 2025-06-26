// === [firebase_auth.js] ===
// 🔐 Firebase Authentication Module with Email + OTP fallback
// 🌐 Supports: Email/Password login, Phone OTP backup
// ⚙️ Version: ULCS Auth v1.0

const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
} = require("firebase/auth");

// ✅ Firebase Config (replace with your actual Firebase credentials)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// ✅ Login with Email and Password
async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return {
      success: true,
      userId: userCredential.user.uid,
      email: userCredential.user.email,
      token
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ✅ Fallback: Login via Phone OTP (for mobile app with recaptcha)
async function loginWithPhoneOTP(phoneNumber, appVerifier) {
  try {
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    // Wait for user to enter OTP:
    return {
      success: true,
      confirmOTP: async (otp) => {
        const result = await confirmation.confirm(otp);
        const token = await result.user.getIdToken();
        return {
          userId: result.user.uid,
          phone: result.user.phoneNumber,
          token
        };
      }
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ✅ Check current login status
function watchUserState(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        loggedIn: true,
        userId: user.uid,
        email: user.email || null,
        phone: user.phoneNumber || null
      });
    } else {
      callback({ loggedIn: false });
    }
  });
}

module.exports = {
  loginWithEmail,
  loginWithPhoneOTP,
  watchUserState
};
