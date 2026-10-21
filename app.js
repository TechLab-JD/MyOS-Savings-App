const root=document.getElementById('SavingsApp');
if(root){const $=id=>root.querySelector('#'+id);
  let st={name:'',target:1000,log:[]};try{const s=JSON.parse(localStorage.getItem('myos.savings')||'null');if(s)st=s;}catch(e){}
  function save(){try{localStorage.setItem('myos.savings',JSON.stringify(st));}catch(e){}}
  function render(){$('sv-name').value=st.name;$('sv-target').value=st.target;
    const saved=st.log.reduce((a,b)=>a+b.amt,0),pct=Math.min(100,Math.round(saved/st.target*100))||0;
    $('sv-fill').style.width=pct+'%';$('sv-pct').textContent=pct+'%';
    $('sv-stat').textContent='$'+saved.toFixed(2)+' of $'+Number(st.target).toFixed(2)+'  ·  $'+Math.max(0,st.target-saved).toFixed(2)+' to go';
    const l=$('sv-log');l.innerHTML='';st.log.slice().reverse().forEach((e,ri)=>{const i=st.log.length-1-ri;const d=document.createElement('div');d.innerHTML='<span>'+e.date+'</span><span>$'+e.amt.toFixed(2)+'</span><button>✕</button>';d.querySelector('button').onclick=()=>{st.log.splice(i,1);save();render();};l.appendChild(d);});}
  $('sv-name').addEventListener('input',()=>{st.name=$('sv-name').value;save();});
  $('sv-target').addEventListener('input',()=>{st.target=Math.max(1,parseFloat($('sv-target').value)||1);save();render();});
  $('sv-go').onclick=()=>{const a=parseFloat($('sv-amt').value);if(!a)return;st.log.push({amt:a,date:new Date().toISOString().slice(5,10)});$('sv-amt').value='';save();render();};
  $('sv-amt').addEventListener('keydown',e=>{if(e.key==='Enter')$('sv-go').click();});
  render();}
