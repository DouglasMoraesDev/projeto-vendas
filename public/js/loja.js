import { getProdutosLoja, tickVisita, BASE_URL } from "./api.js";

const container = document.getElementById("lojaContainer");

function fmtBRL(v){
  return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v);
}

async function init(){
  if(!localStorage.getItem("lojavisitante_token")){
    return location.href = "storeLogin.html";
  }
  try { await tickVisita(); } catch{}
  const all = await getProdutosLoja();
  // só exibe com estoque > 0
  const disponiveis = all.filter(p=>p.quantidadeEstoque>0);
  render(disponiveis);
}

function render(produtos){
  container.innerHTML = "";
  produtos.forEach(p=>{
    const fotos = (p.fotos||[]).map((f,i)=>`
      <img src="${BASE_URL}${f.caminho}"
           alt="${p.nome}"
           class="${i===0?'active':''}">
    `).join("") ||
    `<img src="https://via.placeholder.com/200?text=Sem+Foto" class="active">`;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="gallery-container">
        ${fotos}
        <button class="prev">&lt;</button>
        <button class="next">&gt;</button>
      </div>
      <h4>${p.nome}</h4>
      <p>${p.descricao||""}</p>
      <p class="valor-loja">${fmtBRL(p.valorUnitario)}</p>
      <button class="whatsappBtn" data-nome="${encodeURIComponent(p.nome)}">
        Conversar
      </button>
    `;
    container.appendChild(card);

    // carrossel por card
    const imgs = card.querySelectorAll("img");
    let idx = 0;
    card.querySelector(".prev").onclick = ()=>{
      imgs[idx].classList.remove("active");
      idx = (idx-1+imgs.length)%imgs.length;
      imgs[idx].classList.add("active");
    };
    card.querySelector(".next").onclick = ()=>{
      imgs[idx].classList.remove("active");
      idx = (idx+1)%imgs.length;
      imgs[idx].classList.add("active");
    };
  });

  // whatsapp
  document.querySelectorAll(".whatsappBtn").forEach(btn=>{
    btn.onclick = ()=> {
      const nome = decodeURIComponent(btn.dataset.nome);
      const vend = "5512997610410";
      const user = JSON.parse(localStorage.getItem("lojavisitante")||"null");
      const msg = user
        ? `Olá, sou ${user.nome} e me interessei por "${nome}".`
        : `Tenho interesse no produto "${nome}".`;
      window.open(`https://wa.me/${vend}?text=${encodeURIComponent(msg)}`,"_blank");
    };
  });
}

document.addEventListener("DOMContentLoaded", init);
