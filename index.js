const sendbtn =document.getElementById("button");
const errdiv = document.getElementById("err");
const person =document.getElementById("person")
const givenmsg =document.getElementById("msg")
// const =document.getElementById("")
sendbtn.addEventListener("click",messagesent);

function messagesent(e){
    e.preventDefault();
    if (person.value=="Who U Are"){
        error("Select Who You Are Before Sending a message");
    }else if(givenmsg.value==""){
        error("Type A Message Before Sending");
    }else{
        let obj ={
            "person":person.value,
            "msg": givenmsg.value
        }
        axios.post("https://crudcrud.com/api/c198bfc5e7eb4b69a75ef1581b75c387/AppointmentData",obj)
            .then(res =>{
                console.log(res.data);
                showOnScreen(res.data);
                document.getElementById('msg').value=""
            })
            .catch((err)=>{
                console.log(err);
            })
    }

}


function error(val){
    const li = document.createElement("p");
    li.textContent=val;
    errdiv.appendChild(li)
    setTimeout(() => {
        errdiv.removeChild(li)
    }, 3000);
}

function showOnScreen(obj){
    const parentEme=document.getElementById('messages')
    const childEle=document.createElement('ul')
    childEle.className=obj.person
    childEle.innerHTML=obj.person +new Date().toLocaleString()+'  <br>   '+ obj.msg +'  -  '
    const deleteButton=document.createElement('button')
    deleteButton.id=obj._id 
    deleteButton.value='delete message'
    deleteButton.className = "dbtn"
    deleteButton.onclick =() => {
      // localStorage.removeItem(obj.mail)
      parentEme.removeChild(childEle)
      // delete api not written//
      deleteUser(deleteButton.id)
    }
    childEle.appendChild(deleteButton)
    parentEme.appendChild(childEle)
}
document.addEventListener("DOMContentLoaded",()=>{
    console.log("dom content loaded")
      axios.get("https://crudcrud.com/api/c198bfc5e7eb4b69a75ef1581b75c387/AppointmentData")//AppointData is not written
        .then((response)=>{
          // console.log(response.data.length);
          for(var i=0; i<response.data.length; i++){
            showOnScreen(response.data[i]);
          }
        })
        .catch(err=>console.log(err))
})

function deleteUser(userId){
    let chi=`https://crudcrud.com/api/c198bfc5e7eb4b69a75ef1581b75c387/AppointmentData/${userId}`
    axios.delete(chi)
        .then((response)=>{
            console.log("deleted successfully")
        })
        .catch(err=>console.log(err))
}