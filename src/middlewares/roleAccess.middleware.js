import { accessRolesEnum } from "../config/enums.config.js";

const roleAccessMiddleware = (...roles) => (req, res, next) => {
    if(roles[0] === accessRolesEnum.PUBLIC) {
        return next();
    };
    
    const user = req.session.user;
    if(!user) {
        return res.redirect('/login');
    };
    if(!roles.includes(user.role.toUpperCase())){
        return res.status(403).send({ status: 'error', description: 'not permissions' });
    };
    
    next();
};

export default roleAccessMiddleware;