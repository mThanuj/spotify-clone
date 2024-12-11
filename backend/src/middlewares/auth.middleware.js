import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({
      message: "Unauthorized - you must be logged in",
    });
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_URL == currentUser.primaryEmailAddress.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({
        message: "Unauthorized - you must be an admin",
      });
    }

    next();
  } catch (err) {
    console.error(`Error in requireAdmin middleware: ${err}`);

    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err}`,
    });
  }
};
