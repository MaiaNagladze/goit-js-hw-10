import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as s}from"./assets/vendor-BbbuE1sJ.js";const t=document.querySelector(".form");t.addEventListener("submit",o=>{o.preventDefault();const i=t.elements.delay.value,r=t.elements.state.value,m=Number(i);((e,n)=>new Promise((l,u)=>{setTimeout(()=>{n?l(e):u(e)},e)}))(m,r==="fulfilled").then(e=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{s.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})});
//# sourceMappingURL=2-snackbar.js.map
