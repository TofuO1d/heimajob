const registerBtn = document.querySelector('#btn-register')

registerBtn.addEventListener('click',async function(){
    const formDom = document.querySelector('.register-form')
    const data = serialize(formDom,{hash:true,empty:true})
    const username = data.username
    const password = data.password
    if(username.length<8||username.length>30){
        return showToast('用户名长度错误')
    }
    if(password.length<6||password.length>30){
        return showToast('密码长度错误')
    }
    try {
        const res = await axios.post('/register',{username,password})
        console.log(res);
        showToast(res.data.message)
        setTimeout(function(){
            location.href = './login.html'
        },1500)
    } catch (err) {
        return showToast(err.response.data.message)
    }
    
})