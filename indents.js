var data = [
  {
    id:1,
    user:"punit",
    comment:"this is a nice post",
    parent:null,
  },
  {
    id:2,
    user:"cogun",
    comment:"yes! you're right.",
    parent:"punit",
  },
  {
    id:4,
    user:"shogan",
    comment:"nested comment",
    parent:"cogun",
  },
  {
    id:5,
    user:"qwerty",
    comment:"nested comment 2",
    parent:"shogan",
  },
  {
    id:3,
    user:"new",
    comment:"ya good :-)",
    parent:"punit",
  },
    {
    id:6,
    user:"random",
    comment:"this also a nice post",
    parent:null,
  },
]
var intend = 0
function getObjectByProp(prop,value){
    var a = {}
    data.forEach( i => {
        if (i[prop] == value)
            a = i
            return a
    })
    return a
}
function calc(user){
    x = getObjectByProp("user",user)
    if (x.parent == null)
        return 0
    else
        intend += 15
    calc(x.parent)
    return intend
}
function comments(){
  data.forEach( i => {
    if (i.parent == null)
        comment(i.user,i.comment,0,null)
    else
        {
            intend = 0 
          comment(i.user,i.comment,calc(i.user),i.parent)
        }
})
}
function comment(user,text,indent,parent=""){
  $(".comments").append(`
    <div class="comment text-gray-600 m-2 rounded-lg shadow-sm w-100 border p-2 flex justify-between items-center" style="margin-left:${indent}px" intend="${indent}" user="${user}" data="${indent}">
    <div class="">
    <p class="p-0 m-0 font-bold text-md">${user}</p>
    <p class="p-0 m-0 text-sm text-gray-500">${text}</p>
    </div>
    
    <p class="text-xs">${parent != null ? '<i class="fa fa-undo"></i>' : ''} ${parent != null ? "replied to <span class='parent text-pink-400 m-0 p-0'>"+parent : "</a>"}</p>
    </div>
     
  `)
}
comments()
var ref = ""
$(".comment").click(function(){
 alert($(this).attr("user")) 
  ref = $(this)
  document.getElementById("focus").scrollIntoView()
})
$(".send").click(function(){
  var x = $(this).prev().val()
  if (x != ''){
    if($(this).attr("parent") != ''){
      // comment("punit",x,$(this).attr("intend"),$(this).attr("parent"))
      data.push({
        id:Math.random(),
        comment:x,
        user:"punit",
        parent:$(this).attr("parent"),
      })
      $(".comments").empty()
      comments()
    }
    else{
      // comment("punit",x,0,null)
            data.push({
        id:Math.random(),
        comment:x,
        user:"punit",
        parent:$(this).attr("parent"),
      })
      $(".comments").empty()
      comments()
    }
    $(this).prev().val("")
  }
})
