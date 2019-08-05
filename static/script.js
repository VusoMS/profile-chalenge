
$(document).ready(()=>{
  
   $('#logout').click((e)=>{
      $(location).attr('href','/');      
   });

   $('.profile-form').submit((e)=>{
      e.preventDefault();
      let user = {
         name : $('#name').val(),
         surname : $('#surname').val(),
         age : $('#age').val(),
         name : $('#name').val(),
         degree : $('#degree').val(),
         course : $('#course').val()
      }
      $.ajax({
         url : '/profile',
         type : 'put',
         contentType : 'application/json',
         data : JSON.stringify(user),
         success: (data)=>{
            if(data.save=='saved'){
               alert('updated successfully');
            }else{
               alert('error: could not update data');
            }
         },
         error : (data)=>{
            alert('an error has occured');
         }
      });
   });
});