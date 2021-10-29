
function UpdateData(){
    //var email = valueOf("email");
   
        //url = 'next.html?name=' + encodeURIComponent(b);
    var email = valueOf("email");
	// var e = document.getElementById("email_addresses");
	// var email = e.options[e.selectedIndex].text;
    
    if (email.indexOf('@') == -1) 
    {
        alert("Please enter a valid Email address.\n");
        window.location.reload()
    }
      
    else{
        //window.location.href='update.html'
        window.location.href='update.html?ls=' + encodeURIComponent(email);
       }
}



function ClearData()
{

       if(confirm("Do you want to proceed with account deletion?"))
       {
		//   window.location.href='delete.html'
            mail=valueOf("email")
	// var e = document.getElementById("email_addresses");
	// var mail = e.options[e.selectedIndex].text;
		const python_data={
       
		 "email":mail,
		 }

		var json_data = JSON.stringify(python_data)
		//alert(json_data)
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", "http://158.101.105.177:8000/update/");
		//xhr.open("POST","https://ff3d-43-247-157-2.ngrok.io/api/v1/users/")

		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(json_data);
		xhr.onload = function() {
			
			if (this.readyState == 4 && this.status==201)
			{
				alert(this.responseText.replace(/['"]+/g, ''));
				
			}
			else if(this.readyState == 4 && this.status==400)
			{
				
				var res = (this.responseText);
				alert(res.replace(/['"]+/g, ''))
				
			}
			}
	

        
           
        // }
	//	else{
      //      window.location.reload() 
      //  }
            
          return false;

		}
}

function GetData(){

	window.location.href="Retrieve.html"
}


function valueOf(name) {
	return document.getElementsByName(name)[0].value;
}
