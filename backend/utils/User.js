const admin = require("firebase-admin");

const loginUser = async (user) => {
    let existingUser = null;

    const users = await admin.firestore().collection("users").get();
    users.forEach(u => {
        const data = u.data();
        if (data.username === user.username) {
            if (data.password !== user.password) {
                throw new Error("Password is incorrect");
            } else {
                existingUser = {
                    id: u.id, 
                    ...data
                };
            }
        }
    });

    if (!existingUser) throw new Error("User doesnt exist");
    return existingUser; 
};

module.exports = {
    loginUser
};
