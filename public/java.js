//grabbing post id from targetted delete request
$(document).ready(function(){
  $(".delete_post").on("click", function(x){
    $target = $(x.target);
    var id = ($target.attr("data-id"));
    $.ajax({
      type:"DELETE",
      url:"/post/"+id,
      success: function(response){
        alert("Deleting Blog Post");
        window.location.href="/";
      },
      error:function(err){
        console.log(err);
      }
    });
  });
});
