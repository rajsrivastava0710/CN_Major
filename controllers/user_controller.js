const User = require("../models/user");

module.exports.profile = function(req,res){
	User.findById(req.params.id,function(err,user){
		return res.render('profile',{
			title:'ProfilePage',
			profile_user: user
		});
	});	
}

module.exports.modify = function(req,res){
	User.findById(req.params.id,function(err,user){
		return res.render('updateUser',{
			title:'UpdateProfilePage',
			profile_user: user
		});
	});	
}

module.exports.update = function(req,res){
	if(req.user.id == req.params.id){
	User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
		if(err){
			console.log('error in updation',err);
			req.flash('error','Oops! Some error occured..')
		}
		req.flash('success','User Profile Updated Successfully !');
		return res.redirect(`/users/profile/${req.params.id}`);	
	});
	}else{
		req.flash('success','Mr. Hacker , You are unauthorised to perform such stuffs !')
		return res.status(401).send('Unauthorised');
	}
}

module.exports.login = function(req,res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
	return res.render('login',{
		title:'LoginPage'
	});
}
module.exports.signup = function(req,res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
	return res.render('signup',{
		title:'SignUpPage'
	});
}

// get signup data
module.exports.create = function(req,res){
	if(req.body.password != req.body.confirm_password){
		return res.redirect('back');
	}
	User.findOne({email: req.body.email},function(err, user){
		if(err){console.log("Error in finding user in signup"); return;}
		if(!user){
			User.create(req.body,function(err,user){
				if(err){console.log("Error in creating user in signup"); return;}
				return res.redirect('/users/login');
			})
		}else{
			return(res.redirect('back'));
		}
	})
}

// signin and create session for user
module.exports.createSession = function(req,res){
	req.flash('success','Logged in successfully!');
	return res.redirect('/');
}

module.exports.removeSession = function(req,res){
	req.logout();
	req.flash('success','Logged out successfully..');
	return res.redirect('/');
}