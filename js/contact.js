$(document).ready(function(){
     $("#sendtobtn").click(function() {
     	    var sendtoname = $("#sendtoname").val();		
	 		var sendtoemail = $("#sendtoemail").val();
	 		var sendtomessage = $("#sendtomessage").val();
	 		//alert(sendtocontent+sendtosubject);
			$.get("../php/email.php?action=sendemail&sendtoname="+sendtoname+"&sendtoemail="+sendtoemail+"&sendtomessage="+sendtomessage,function(data,status) {
				alert("Your Message Has been Sent!");
		});
    });


});















