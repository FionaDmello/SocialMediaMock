const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");

// update user
router.put("/:id",async(req,res)=> {
    // check if user is authorized to update info
    if(req.body.userId === req.params.id || req.body.isAdmin){
        // if user is authorized to update info, handle password update
        if(req.body.password){
            // generate a hashed new password
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            }catch(err){
                console.log("Error while updating user account info - password update")
                res.status(500).json(err)
            } 
        }
        // update actual user info
        try{
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Account has been successfully updated!")
        }catch(err){
            console.log("Error while updating user account info - user update")
            res.status(500).json(err)
        }
    }
    else{
        console.log("Error while updating user account info - unauthorized attempt")
        return res.status(403).json("You are not authorized to update this account");
    }
});

// delete user
router.delete("/:id",async(req,res)=> {
    // check if user is authorized to delete account
    if(req.body.userId === req.params.id || req.body.isAdmin){
        // delete actual user account
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been successfully deleted!")
        }catch(err){
            console.log("Error while deleting user account")
            res.status(500).json(err)
        }
    }
    else{
        console.log("Error while deleting user account - unauthorized attempt")
        return res.status(403).json("You are not authorized to delete this account");
    }
});

// get a user
router.get("/",async(req,res)=> {
    // When either one of them is sent as /users?userId=<VALUE> or /users?username=<VALUE> 
    // this API is called and the corresponding param is used.
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId ? await User.findById(userId) : await User.findOne({username : username});
        // To pass only relevant keys to the front end
        const {password,createdAt,...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        console.log("Error while getting user account");
        return res.status(500).json(err)
    }
});

//  follow a user
router.get("/:id/follow", async(req,res)=> {
    if(req.body.userId !== req.params.id){
        try{
            const userToBeFollowed =  await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!userToBeFollowed.followers.includes(req.body.userId)){
                await userToBeFollowed.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: {following: req.params.id } });
                res.status(200).json("User is being followed")
            }
            else{
                console.log("User already followed")
                res.status(403).json("You already follow this user")
            }

        }catch(err){
            console.log("Error while following another user")
            res.status(500).json(err);
        }
    }
    else{
        console.log("Error while following - not allowed to follow self")
        res.status(403).json("You cannot follow yourself")
    }
});

// unfollow a user
router.get("/:id/unfollow", async(req,res)=> {
    if(req.body.userId !== req.params.id){
        try{
            const userToBeUnfollowed =  await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(userToBeUnfollowed.followers.includes(req.body.userId)){
                await userToBeunFollowed.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: {following: req.params.id } });
                res.status(200).json("User is unfollowed")
            }
            else{
                console.log("User was not followed, to begin with")
                res.status(403).json("You already do not follow this user")
            }

        }catch(err){
            console.log("Error while unfollowing another user")
            res.status(500).json(err);
        }
    }
    else{
        console.log("Error while following - not allowed to follow self")
        res.status(403).json("You cannot follow yourself")
    }
});

// get friends (Those that the user follows)
router.get("/friends/:userId",async(req,res)=> {
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map((friendId =>{
                return User.findById(friendId);
            })
        ));
        // Taking just the required data
        let friendList = [];
        friends.map(friend => {
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture})
        })
        res.status(200).json(friendList);
    }catch(err){
        console.log("Error while getting friends",err);
        return res.status(500).json(err)
    }
});

module.exports = router