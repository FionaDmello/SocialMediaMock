const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const _ = require("underscore");

// create a post
router.post("/", async(req,res)=> {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        console.log("Error while creating new post",err);
        res.status(500).json(err)
    }
});

// update a post
router.put("/:postId",async(req,res)=> {
    try{
        // check if user is authorized to update post
        const post = await Post.findById(req.params.postId);
        if(post.userId === req.body.userId){
            await Post.findByIdAndUpdate(req.params.postId, { $set:req.body });
            res.status(200).json("Your post has been updated")
        }
        else{
            console.log("Error while updating post - unauthorized")
            res.status(403).json("You are not authorized to update this post")
        }
    }catch(err){
        console.log("Error while updating post",err)
        res.status(500).json(err)
    }
    
});
// delete a post
router.delete("/:postId",async(req,res)=> {
    try{
        const post = await Post.findById(req.params.postId);
        if(post.userId === req.body.userId){
            await Post.deleteOne();
            res.status(200).json("Post successfully deleted");
        }   
        else{
            console.log("Error while deleting post - unauthorized")
            res.status(403).json("You are not authorized to delete this post")
        }
    }catch(err){
        console.log("Error while deleting post", err);
        res.status(500).json(err)
    }
});
// like a post
router.put("/:postId/like", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        // To like a post
        if(!post.likes.includes(req.body.userId)){
            await Post.updateOne({ $push: {likes: req.body.userId} });
            res.status(200).json("The post has been liked");
        }
        // To unlike a liked post
        else{ 
            await Post.updateOne({ $pull: {likes: req.body.userId} });
            res.status(200).json("The post has been unliked");
        }
    }catch(err){
        console.log("Error while liking post", err);
        res.status(500).json(err)
    }
});

// get a post
router.get("/:postId", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    }catch(err){
        console.log("Error while getting post", err);
        res.status(500).json(err)
    }
});

// get all posts from one user
router.get("/profile/:username",async(req,res) => {
    try{
        const user = await User.findOne({username: req.params.username});
        const userPosts = await Post.find({userId: user._id})
        res.status(200).json(userPosts)
    }catch(err){
       console.log("Error while fetching one users posts",err);
       res.status(500).json(err) 
    }
})

// get timeline posts (get all individuals followed by this user, and get every individuals post to create timeline )
router.get("/timeline/:userId",async(req,res) => {
    let timelinePosts
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const followedUsersPosts = await Promise.all(
            currentUser.following.map((followedUsersId) => {
                return Post.find({ userId: followedUsersId })
            })
        );
        // sorting timeline posts by to have last updated posts on top
        timelinePosts = _.sortBy(userPosts.concat(...followedUsersPosts),'updatedAt').reverse();
        res.status(200).json(timelinePosts)

    }catch(err){
       console.log("Error while fetching user timeline",err);
       res.status(500).json(err) 
    }
})
module.exports = router