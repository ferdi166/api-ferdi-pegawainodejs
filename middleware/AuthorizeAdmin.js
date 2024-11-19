export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(403).send("Access forbidden: Only admin can access this resource");
    }
    next();
};