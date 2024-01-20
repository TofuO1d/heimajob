/**
 * 目标: 完成登录功能
 *  1. 注册事件 #btn-login
 *  2. 收集表单数据.并验证
 *  3. 发送请求,判断请求,提示用户
 *  4. 如果成功则本地存储用户名(?)
 *  5. 跳转页面
 */
 const loginForm = document.querySelector('.login-form')
 // 1. 注册事件 #btn-login
 document.querySelector('#btn-login').addEventListener('click', async e => {
   // 2. 收集表单数据.并验证
   const data = serialize(loginForm, { hash: true, empty: true })
   if (!data.username || !data.password) {
     return showToast('请输入用户名或密码')
   }
   if (data.username.length < 8 || data.username.length > 30) {
     return showToast('用户名格式错误')
   }
   if (data.password.length < 6 || data.password.length > 30) {
     return showToast('密码格式错误')
   }
   // 3. 发送请求,判断响应结果,提示用户  axios.post(地址,请求参数)
   try {
     const res = await axios.post('/login', data)
     // 4. 如果成功则本地存储用户名(?)
     const obj = {} // 存储用户名及其他
     obj.username = res.data.data.username
     obj.token = res.data.data.token
     localStorage.setItem('userMsg', JSON.stringify(obj))
     showToast(res.data.message)
     // 5. 跳转页面
     setTimeout(() => {
        checkToken()
        location.href = './index.html'
     }, 1500)
   } catch (err) {
     return showToast(err.response.data.message)
   }
 })