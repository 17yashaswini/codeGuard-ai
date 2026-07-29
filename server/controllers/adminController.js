import User from '../models/User.js';
import Analysis from '../models/Analysis.js';

export const getAdminStats = async (req, res) => {
  try {
    const { userId } = req.auth();

    if (userId !== process.env.ADMIN_USER_ID) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const totalUsers = await User.countDocuments();
    const totalAnalyses = await Analysis.countDocuments();

    const severityCounts = await Analysis.aggregate([
      { $group: { _id: '$severity', count: { $sum: 1 } } }
    ]);

    const recentAnalyses = await Analysis.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const totalCreditsUsed = await Analysis.countDocuments();

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email credits createdAt');

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalAnalyses,
        totalCreditsUsed,
        severityCounts,
        recentAnalyses,
        recentUsers
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};