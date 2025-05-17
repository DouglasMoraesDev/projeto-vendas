import g from"https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();const f=window.location.hostname==="localhost",d=f?"http://localhost:4000":"https://projeto-vendas-production.up.railway.app",h=`${d}/api`,c=g.create({baseURL:h});c.interceptors.request.use(t=>{const r=localStorage.getItem("token");return r&&(t.headers.Authorization=`Bearer ${r}`),t},t=>Promise.reject(t));const l={register:t=>c.post("/auth/register",t),login:t=>c.post("/auth/login",t),getClientes:()=>c.get("/clientes"),createCliente:t=>c.post("/clientes",t),getMercadorias:()=>c.get("/mercadorias"),createMercadoria:(t,r)=>{const e=new FormData;return Object.entries(t).forEach(([a,n])=>e.append(a,n)),r.slice(0,5).forEach(a=>e.append("fotos",a)),c.post("/mercadorias",e)},getVendas:()=>c.get("/vendas"),createVenda:t=>c.post("/vendas",t),getParcelasPending:()=>c.get("/parcelas/pending"),payParcela:(t,r,e)=>{const a=new FormData;return a.append("comprovante",r),a.append("recebidoPor",e),c.post(`/parcelas/${t}/pay`,a)},getComprovantes:t=>c.get(`/comprovantes?clienteId=${t}`),baixarPdf:t=>{const r=`${d}/api/comprovantes/${t}/pdf`;window.open(r,"_blank")}};function y(){return{template(){return`
        <h2>Login</h2>
        <form id="form-login">
          <label>E-mail: <input type="email" name="email" required></label>
          <label>Senha:  <input type="password" name="senha" required></label>
          <button>Entrar</button>
        </form>
        <p id="error" style="color:red;"></p>
      `},init(){const t=document.getElementById("form-login"),r=document.getElementById("error");t.onsubmit=async e=>{var a,n;e.preventDefault(),r.textContent="";try{const o=await l.login({email:t.email.value,senha:t.senha.value});localStorage.setItem("token",o.data.token),location.hash="#/dashboard"}catch(o){r.textContent=((n=(a=o.response)==null?void 0:a.data)==null?void 0:n.error)||o.message}}}}}function m(){return{template(){return`
        <h1>Dashboard</h1>
        <nav>
          <a href="#/clientes">Clientes</a> |
          <a href="#/mercadorias">Mercadorias</a> |
          <a href="#/vendas">Vendas</a> |
          <a href="#/parcelas">Parcelas</a> |
          <a href="#/historico">Histórico</a> |
          <a href="#/comprovantes">Comprovantes</a> |
          <a href="#/loja">Loja</a>
        </nav>
        <button id="btn-logout">Sair</button>
      `},init(){document.getElementById("btn-logout").onclick=()=>{localStorage.removeItem("token"),location.hash="#/login"}}}}function v(){return{template(){return`
        <h1>Clientes</h1>
        <button id="btn-novo">Novo Cliente</button>
        <form id="form-cliente" style="display:none">
          <label>Nome:     <input name="nome" required></label>
          <label>CPF:      <input name="cpf" required></label>
          <label>Telefone: <input name="telefone" required></label>
          <label>Endereço: <input name="endereco"></label>
          <button type="submit">Salvar</button>
          <button type="button" id="btn-cancel">Cancelar</button>
        </form>
        <ul id="lista-clientes"></ul>
      `},init(){const t=document.getElementById("lista-clientes"),r=document.getElementById("btn-novo"),e=document.getElementById("form-cliente"),a=document.getElementById("btn-cancel");r.onclick=()=>e.style.display="block",a.onclick=()=>e.style.display="none",e.onsubmit=async o=>{o.preventDefault(),await l.createCliente({nome:e.nome.value,cpf:e.cpf.value,telefone:e.telefone.value,endereco:e.endereco.value}),e.reset(),e.style.display="none",n()};async function n(){const o=await l.getClientes();t.innerHTML=o.data.map(i=>`<li>${i.nome} — CPF: ${i.cpf} — Tel: ${i.telefone}</li>`).join("")}n()}}}function $(){return{template(){return`
        <h1>Mercadorias</h1>
        <button id="btn-nova">Nova Mercadoria</button>
        <form id="form-mercadoria" style="display:none" enctype="multipart/form-data">
          <label>Nome:        <input name="nome" required></label>
          <label>Descrição:   <textarea name="descricao"></textarea></label>
          <label>Valor Unit.: <input name="valorUnitario" type="number" step="0.01" required></label>
          <label>Estoque:     <input name="quantidadeEstoque" type="number" min="0" required></label>
          <label>Fotos (até 5): <input name="fotos" type="file" accept="image/*" multiple></label>
          <button type="submit">Salvar</button>
          <button type="button" id="btn-cancel">Cancelar</button>
        </form>
        <div id="cards-mercadoria"></div>
      `},init(){const t=document.getElementById("cards-mercadoria"),r=document.getElementById("btn-nova"),e=document.getElementById("form-mercadoria"),a=document.getElementById("btn-cancel");r.onclick=()=>e.style.display="block",a.onclick=()=>e.style.display="none",e.onsubmit=async o=>{o.preventDefault();const i={nome:e.nome.value,descricao:e.descricao.value,valorUnitario:Number(e.valorUnitario.value),quantidadeEstoque:Number(e.quantidadeEstoque.value)},s=Array.from(e.fotos.files);await l.createMercadoria(i,s),e.reset(),e.style.display="none",n()},n();async function n(){const o=await l.getMercadorias();t.innerHTML=o.data.map(i=>`
          <div class="card">
            <h4>${i.nome}</h4>
            <p>R$ ${i.valorUnitario.toFixed(2)}</p>
            <p>Em estoque: ${i.quantidadeEstoque}</p>
            ${i.fotos.map(s=>`
              <img 
                src="${d}${s.caminho}" 
                width="80"
                onerror="this.src='placeholder.jpg'"
              >
            `).join("")}
          </div>
        `).join("")}}}}function E(){return{template(){return`
        <h1>Registrar Venda</h1>
        <form id="form-venda">
          <label>Cliente:
            <select name="clienteId" required></select>
          </label>
          <label>Mercadoria:
            <select name="mercadoriaId" required></select>
          </label>
          <label>Quantidade:
            <input name="quantidade" type="number" min="1" value="1" required>
          </label>
          <label>Pagamento:
            <select name="tipoPagamento">
              <option value="avista">À vista</option>
              <option value="parcelado">Parcelado</option>
            </select>
          </label>
          <div id="parcelamento" style="display:none">
            <label>Entrada:
              <input name="entrada" type="number" step="0.01">
            </label>
            <label>Nº Parcelas:
              <input name="numParcelas" type="number" min="1">
            </label>
          </div>
          <button>Enviar</button>
        </form>

        <h3>Vendas Recentes</h3>
        <ul id="lista-vendas"></ul>
      `},init(){P(),p()}}}function P(){const t=document.getElementById("form-venda"),r=t.clienteId,e=t.mercadoriaId;l.getClientes().then(a=>a.data.forEach(n=>r.add(new Option(n.nome,n.id)))),l.getMercadorias().then(a=>a.data.forEach(n=>e.add(new Option(`${n.nome} (R$${n.valorUnitario.toFixed(2)})`,n.id)))),t.tipoPagamento.onchange=a=>{document.getElementById("parcelamento").style.display=a.target.value==="parcelado"?"block":"none"},t.onsubmit=async a=>{a.preventDefault();const n={clienteId:Number(t.clienteId.value),itens:[{mercadoriaId:Number(t.mercadoriaId.value),quantidade:Number(t.quantidade.value)}],tipoPagamento:t.tipoPagamento.value,entrada:t.entrada.value||void 0,numParcelas:t.numParcelas.value||void 0};await l.createVenda(n),t.reset(),document.getElementById("parcelamento").style.display="none",p()}}async function p(){const t=document.getElementById("lista-vendas"),r=(await l.getVendas()).data;t.innerHTML=r.map(e=>`
    <li>
      #${e.id} • ${new Date(e.criadoEm).toLocaleString()} • ${e.cliente.nome} •
      R$${e.valorTotal.toFixed(2)} • ${e.tipoPagamento}
    </li>
  `).join("")}function I(){return{template(){return`
        <h1>Parcelas Pendentes</h1>
        <ul id="lista-parcelas"></ul>
      `},init(){b()}}}async function b(){const t=document.getElementById("lista-parcelas"),r=await l.getParcelasPending();t.innerHTML=r.data.map(e=>`
    <li>
      Venda #${e.vendaId} • Parcela ${e.numParcela} •
      Vence em ${new Date(e.dataVencimento).toLocaleDateString()}
      <br>
      <input type="file" id="file-${e.id}">
      <input placeholder="Recebido por" id="rec-${e.id}">
      <button data-id="${e.id}">Pagar</button>
    </li>
  `).join(""),t.querySelectorAll("button").forEach(e=>{e.onclick=async()=>{const a=e.dataset.id,n=document.getElementById(`file-${a}`).files[0],o=document.getElementById(`rec-${a}`).value;await l.payParcela(a,n,o),b()}})}function w(){return{template(){return`
        <h1>Histórico de Vendas</h1>
        <ul id="hist-list"></ul>
      `},init(){q()}}}async function q(){const t=document.getElementById("hist-list"),r=(await l.getVendas()).data;t.innerHTML=r.map(e=>{const a=e.itens.map(o=>o.mercadoria.fotos.map(i=>`<img src="${d}${i.caminho}" width="50" onerror="this.src='placeholder.jpg'">`).join("")).join(""),n=e.parcelas.map(o=>`#${o.numParcela} (${o.pago?"Pago":"Aberto"})`).join("; ");return`
      <li>
        <strong>#${e.id}</strong> • ${new Date(e.criadoEm).toLocaleString()} • ${e.cliente.nome}<br>
        Itens: ${e.itens.map(o=>`${o.quantidade}×${o.mercadoria.nome}`).join(", ")}<br>
        ${a}<br>
        Total: R$${e.valorTotal.toFixed(2)} • ${e.tipoPagamento}<br>
        Parcelas: ${n}
      </li>
    `}).join("")}function B(){return{template(){return`
        <h1>Comprovantes de Pagamento</h1>
        <input id="cli-id" type="number" placeholder="ID Cliente">
        <button id="btn-buscar">Buscar</button>
        <ul id="lista-comps"></ul>
        <button id="btn-logout">Sair</button>
      `},init(){document.getElementById("btn-buscar").onclick=async()=>{const t=document.getElementById("cli-id").value,r=await l.getComprovantes(t),e=document.getElementById("lista-comps");e.innerHTML=r.data.map(a=>`
          <li>
            #${a.id} • ${new Date(a.criadoEm).toLocaleString()} • Recebido por: ${a.recebidoPor}
            <button data-id="${a.parcelaId}">Baixar PDF</button>
          </li>
        `).join(""),e.querySelectorAll("button").forEach(a=>{a.onclick=()=>l.baixarPdf(a.dataset.id)})},document.getElementById("btn-logout").onclick=()=>{localStorage.removeItem("token"),location.hash="#/login"}}}}function C(){return{template(){return'<h2>Loja Pública</h2><div id="loja"></div>'},async init(){const t=document.getElementById("loja"),r=await l.getMercadorias();t.innerHTML=r.data.map(e=>`
        <div class="card">
          <h4>${e.nome}</h4>
          <p>R$${e.valorUnitario.toFixed(2)}</p>
          ${e.fotos.map(a=>`<img src="${a.caminho}" width="80">`).join("")}
          <button data-id="${e.id}">Conversar</button>
        </div>
      `).join(""),t.querySelectorAll("button").forEach(e=>{e.onclick=()=>{const a=r.data.find(o=>o.id==e.dataset.id),n=encodeURIComponent(`Olá, tenho interesse em: ${a.nome} (R$${a.valorUnitario.toFixed(2)})`);window.open(`https://wa.me/SEU_TELEFONE?text=${n}`,"_blank")}})}}}const L={"/login":y,"/dashboard":m,"/clientes":v,"/mercadorias":$,"/vendas":E,"/parcelas":I,"/historico":w,"/comprovantes":B,"/loja":C};function u(){var n;const t=localStorage.getItem("token");let r=location.hash.slice(1)||(t?"/dashboard":"/login");if(!t&&r!=="/login")return location.hash="#/login",u();const a=(L[r]||m)();document.getElementById("app").innerHTML=a.template(),(n=a.init)==null||n.call(a)}window.addEventListener("hashchange",u);window.addEventListener("load",u);
