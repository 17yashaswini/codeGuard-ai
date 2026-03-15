import { clerkClient } from '@clerk/express';

const protectRoute = async (req, res, next) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - Please login' });
    }

    const user = await clerkClient.users.getUser(userId);
    req.user = user;
    next();

  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Unauthorized - ' + error.message });
  }
};

export default protectRoute;