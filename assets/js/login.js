let email = $('#email');
let password = $('#password');
let warning = $('.warning');
let forgot_form = $('.hide');
let forgot_btn = $('.forgot-pass');
forgot_form.hide();
warning.hide();
email.on('focus',function(){
	$(warning[0]).slideDown(1000);
});
password.on('focus',function(){
	$(warning[1]).slideDown(1000);
});
forgot_btn.on('click',function(){
	$(forgot_form).slideDown(1000);
});
