/* CampusConnect shared UI: navbar, footer, badges, modal, toast */
const PAGES=[["index.html","Home"],["library.html","Library"],["maintenance.html","Maintenance"],["shuttle.html","Shuttle"],["emergency.html","Emergency"],["food.html","Food"],["notices.html","Notices"]];
const cur=location.pathname.split("/").pop()||"index.html";
const BADGE={green:"bg-green-50 text-green-700 ring-green-600/20",amber:"bg-amber-50 text-amber-700 ring-amber-600/20",red:"bg-red-50 text-red-700 ring-red-600/20",blue:"bg-blue-50 text-blue-700 ring-blue-600/20",slate:"bg-slate-100 text-slate-700 ring-slate-500/20"};
const badge=(t,c)=>`<span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${BADGE[c]}">${t}</span>`;
const CARD="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 transition duration-200 hover:shadow-md hover:-translate-y-0.5";
const BTN="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
const BTN2="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
const INPUT="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const field=(label,inner)=>`<label class="block text-sm font-medium text-slate-700">${label}<div class="mt-1.5 font-normal">${inner}</div></label>`;
const select=(id,label,opts)=>field(label,`<select id="${id}" class="${INPUT}">${opts.map(o=>`<option>${o}</option>`).join("")}</select>`);

/* Navbar (desktop links + mobile menu) with active state */
const links=(cls)=>PAGES.map(([h,t])=>`<a href="${h}" class="${cls} rounded-lg px-3 py-2 text-sm font-medium transition ${h===cur?"bg-blue-50 text-blue-600":"text-slate-600 hover:bg-slate-100"}">${t}</a>`).join("");
document.getElementById("nav").innerHTML=`<header class="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
<a href="index.html" class="flex items-center gap-2 text-lg font-bold tracking-tight"><span class="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 text-white">C</span>CampusConnect</a>
<nav class="hidden gap-1 md:flex">${links("")}</nav>
<button id="menuBtn" class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label="Menu">☰</button></div>
<nav id="mobileNav" class="hidden border-t border-slate-100 px-5 py-3 md:hidden"><div class="flex flex-col">${links("block")}</div></nav></header>`;
document.getElementById("menuBtn").onclick=()=>document.getElementById("mobileNav").classList.toggle("hidden");

/* Footer */
document.getElementById("footer").innerHTML=`<footer class="mt-20 border-t border-slate-200 bg-slate-50"><div class="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
<div><div class="flex items-center gap-2 font-bold"><span class="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-sm text-white">C</span>CampusConnect</div><p class="mt-3 max-w-xs text-sm text-slate-500">One smart platform for library seats, maintenance, shuttle, emergency help, food and notices.</p></div>
<div class="grid grid-cols-2 gap-1 text-sm">${PAGES.map(([h,t])=>`<a href="${h}" class="py-1 text-slate-600 hover:text-blue-600">${t}</a>`).join("")}</div>
<div class="text-sm text-slate-500"><p class="font-medium text-slate-700">Campus helpdesk</p><p class="mt-2">Open 24×7 for emergencies</p><p>help@campusconnect.demo</p></div></div>
<div class="border-t border-slate-200 py-5 text-center text-xs text-slate-400">© 2026 CampusConnect. Demo project with static data.</div></footer>`;

/* Page header: title, subtitle, optional badge */
function pageHeader(title,sub,badgeHtml=""){document.getElementById("header").innerHTML=`<div class="mb-10"><div class="flex flex-wrap items-center gap-3"><h1 class="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">${title}</h1>${badgeHtml}</div><p class="mt-3 max-w-2xl text-slate-500">${sub}</p></div>`;}

/* Reusable modal: openModal(title, bodyHtml, confirmText, onConfirm) */
function closeModal(){document.getElementById("modal")?.remove();}
function openModal(title,body,okText,onOk){closeModal();const m=document.createElement("div");m.id="modal";m.className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4";
m.innerHTML=`<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><div class="mb-4 flex items-center justify-between"><h3 class="text-lg font-semibold">${title}</h3><button data-x class="text-slate-400 hover:text-slate-700">✕</button></div><div class="space-y-4">${body}</div><div class="mt-6 flex gap-2"><button data-x class="${BTN2} flex-1">Cancel</button><button data-ok class="${BTN} flex-1">${okText}</button></div></div>`;
m.onclick=e=>{if(e.target===m||e.target.hasAttribute("data-x"))closeModal();};
m.querySelector("[data-ok]").onclick=()=>onOk(m);document.body.append(m);}
/* Replace modal content with a success message */
function modalSuccess(m,msg){m.firstElementChild.innerHTML=`<div class="py-6 text-center"><div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-50 text-2xl text-green-600">✓</div><p class="mt-4 font-semibold">${msg}</p><button data-x class="${BTN} mt-6">Done</button></div>`;}
const val=id=>document.getElementById(id).value;

/* Toast */
function toast(msg){const t=document.createElement("div");t.className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm text-white shadow-lg";t.textContent=msg;document.body.append(t);setTimeout(()=>t.remove(),2500);}