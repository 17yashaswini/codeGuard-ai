import User from '../models/User.js';

export const syncUser = async (req, res) => {
  try {
    const { id, emailAddresses, fullName } = req.user;
    const email = emailAddresses[0].emailAddress;

    let user = await User.findOne({ clerkId: id });

    if (!user) {
      user = await User.create({
        clerkId: id,
        email,
        name: fullName,
        credits: 5,
      });
    }

    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCredits = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.user.id });
    res.status(200).json({ success: true, credits: user.credits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};