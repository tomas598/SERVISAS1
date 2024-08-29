const role = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ error: "Access denied: No role information" });
    }

    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        error: "Access denied: Insufficient permissions",
        requiredRole: roles,
        userRole: userRole,
      });
    }

    next();
  };
};

module.exports = role;
