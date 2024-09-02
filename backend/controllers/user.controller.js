import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';


export const getUserProfile = async (req, res) => {
    const { userName } = req.params;
    try {
        const user = await User.findOne({ userName }).select("-select");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in get user profile control", error.message);
        res.status(500).json({ error: error.message })
    }
}


export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow/ unfollow yourself" })
        }

        if (!userToModify || !currentUser) {
            return res.status(404).json({ error: "User not found" })
        }

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // unfollow the use
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });


            /*
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });

            await newNotification.save()

            */
            return res.status(200).json({ message: "Unfollowed successfully" })
        } else {
            // follow the user
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            // send notification to the user

            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });

            await newNotification.save()
            return res.status(200).json({ message: "User followed successfully" })

        }
    } catch (error) {
        console.log("Error in follow unfollow user control", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const usersFollowedByMe = await User.findById(userId).select('following');
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            { $sample: { size: 10 } }
        ])

        const filteredUsers = users.filter((user) => !usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);

        suggestedUsers.forEach(user => user.password = null);
        return res.status(200).json(suggestedUsers);

    } catch (error) {
        console.log("Error in get suggested users control", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const updateUser = async (req, res) => {
    const { userName, fullName, email, currentPassword, newPassword, bio, link } = req.body;

    let { profileImage, coverImage } = req.body;
    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Please provide both current password and new password" });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Current password is incorrect" })
            }


            if (newPassword.length < 6) {
                return res.status(400).json({ error: "Password must be at least 6 characters" })
            }

            const hasUpperCase = /[A-Z]/.test(newPassword);
            if (!hasUpperCase) {
                return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
            }

            const hasNumber = /\d/.test(newPassword);
            if (!hasNumber) {
                return res.status(400).json({ error: "Password must contain at least one number" });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if (profileImage) {
            // delete the old image
            if (user.profileImage) {
                await cloudinary.uploader.destroy(user.profileImage.split("/").pop().split(".")[0]);
            }
            // upload the new image
            const uploadedResponse = await cloudinary.uploader.upload(profileImage);
            profileImage = uploadedResponse.secure_url;
        }

        if (coverImage) {
            // delete the old image
            if (user.coverImage) {
                await cloudinary.uploader.destroy(user.coverImage.split("/").pop().split(".")[0]);
            }
            // upload the new image
            const uploadedResponse = await cloudinary.uploader.upload(coverImage);
            coverImage = uploadedResponse.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.userName = userName || user.userName;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImage = profileImage || user.profileImage;
        user.coverImage = coverImage || user.coverImage;

        user = await user.save();
        user.password = null;
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in  update user control", error.message);
        res.status(500).json({ error: error.message });
    }
}