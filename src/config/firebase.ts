// Mock Firebase configuration
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: null) => void) => {
    callback(null);
    return () => {};
  }
};

export const db = {};
export const storage = {}; 