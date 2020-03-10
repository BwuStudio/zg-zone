import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './view/App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});


const data = new FormData()
data.append()


JSON.stringify(Array.from(
  document.body.querySelectorAll('a[rel="magnet"]')
).map(v=>[v.href,v.title]))

function suss(data){
  const arr = JSON.parse(data)
  arr.forEach(v => {
    const url = v[0]
    const title = v[1]
    $.ajax({
      url:"https://115.com/web/lixian/?ct=lixian&ac=add_task_url",
      type:'post',
      data:{
        url
      },success:function(d){
        const a = JSON.parse(d)
        if(!a.state){
          console.log(a.error_msg)
          console.log(url)
          console.log(title)
        }
      }
    })
  });
}

