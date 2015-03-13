function show_result(){
	$("#boy").hide();
	$("#boydie").hide();
	$("#girl").hide();
	$("#girldie").hide();
	var sex = $("#selectsex").val();

	var cla = $("#selectclass").val();

	var age = $("#getage").val();

	var sib = $("#getsib").val();
	//alert(sex);

	var resA = Math.exp(5.619681-1.316003*cla-2.637379*sex-0.044451*age-0.364586*sib);
	var resP = resA/(1+resA);

	//alert(resP);

	if(sex == 1){
		if(resP >= 0.5){
			$("#boy").show();
			alert("You survived :)");
		}else{
			$("#boydie").show();
			alert("You died :(");
		}
	}
	else if(sex == 0){
		if(resP >= 0.5){
			$("#girl").show();
			alert("You survived :)");
		}else{
			$("#girldie").show();
			alert("You died :(");
		}
	}

	
}