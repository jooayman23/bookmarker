let sitname =document.getElementById('sitname')
let siteurl = document.getElementById('siteurl')
let sites = []
if (localStorage.getItem("all sites")) {
    sites = JSON.parse(localStorage.getItem("all sites"))
    displaySite()
}

function addSite() {
    if (allValidation(sitname,'msgName') && allValidation(siteurl,'msgURL') ) {
        
        let site = {
            name : sitname.value,
            url : siteurl.value,
        }
        sites.push(site)
        localStorage.setItem("all sites",JSON.stringify(sites))
        displaySite()
        clearInputs()
    }else{ 
        swal({
            title: "Are you sure?",
            text: "Site Name or Url is not valid, Please follow the rules below:// Site name must contain at least 3 character///Site URL must be a valid one",
            
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          
    }
   
}
function displaySite() {
    let box=""
    for (let i = 0; i < sites.length; i++) {
         box +=`
           <tr>
    <td>${i}</td>
    <td>${sites[i].name}</td>
    <td> <button onclick="visitSite(${i})" class="btn btn-outline-success px-3 btn-sm">Visit</button> </td>
    <td> <button  onclick="deleteUrl(${i})" class="btn btn-outline-danger px-3 btn-sm">Delete</button> </td>
    </tr>
         `
    }
    document.getElementById('tableData').innerHTML = box
    
}
function clearInputs() {
     sitname.value =""
     siteurl.value =""
     sitname.classList.remove("is-valid")
     siteurl.classList.remove("is-valid")

}
function deleteUrl(index) {
    sites.splice(index,1)
    localStorage.setItem("all sites",JSON.stringify(sites))
    displaySite()
}
function visitSite(index) {
    open(sites[index].url,"_target")
    
}
function allValidation(input,msgID) {
    let msg = document.getElementById(msgID);
    let regex = {
        sitname: /^[A-Z][a-z]{3,8}$/,
        siteurl:  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
    }
    if (regex[input.id].test(input.value) == true) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    }else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        msg.classList.remove("d-none");
        return false;
    }
}
