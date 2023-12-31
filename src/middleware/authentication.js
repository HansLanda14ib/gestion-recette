const CustomError = require('../errors')
const admin = require('../configs/firebase-config');


const decodeToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    // throw new CustomError.UnauthenticatedError('Authentication Invalid')
    //console.log('Token : '+token)
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            //console.log(decodeValue)
            const userId = decodeValue.uid;
            const email = decodeValue.email;
            const isVerified = decodeValue.email_verified;

            // Fetch additional user data including role from Firestore
            const userDoc = await admin.firestore().collection('users').doc(userId).get();
            const userData = userDoc.data();

            // Access role from user data in Firestore
            const role = userData?.role || 'owner'; // Default role if not found

            req.user = {userId, email, isVerified, role}
           // console.log("from middleware")
            console.log(req.user)
            return next();
        }
        return res.json({message: 'Unauthorized'});
    } catch (e) {
        console.log(e)
        return res.json({message: e.message});
    }
}


const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError('Unauthorized to access')
        }
        next()

    }


}

module.exports = {
    authorizePermissions, decodeToken
}