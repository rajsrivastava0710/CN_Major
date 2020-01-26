const User = require('../models/user')

const Post = require('../models/post')

module.exports.home = async function(req,res){  
	try{
		let posts = await Post.find({})
		.sort('-createdAt')
		.populate({
			path:'user'
		})
		//nested prepopulating
		.populate(
		{
			path: 'comments',
			populate:{
			path: 'user'
			}
		});

		let users = await User.find({});

		//when i added isValid field in between , then i set isValid field of existing users to true
		// await User.updateMany({},{isValid:true}); //upsert an multi
		
		// console.log(posts);
		return res.render('home',{
			title:'Socialera:Home',
			posts: posts,
			all_users: users
		});	
	
	}catch(err){
		console.log(`Error in loading posts/users:${err}`);
		return ;
	}
	
}
