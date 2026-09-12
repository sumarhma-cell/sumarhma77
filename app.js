import { PROJECTS, HOME_ORDER, CATEGORIES, asset } from "./projects.js";

const PORTRAIT = asset("关于/portrait.jpg");
const ABOUT_ART = asset("关于/about-art.jpg");
const EMAIL = "917422163@qq.com";

const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

function parseRoute() {
  const raw = (location.hash.replace(/^#/, "") || "/").replace(/^\//, "");
  const [page = "", a = ""] = raw.split("/");
  if (!page) return { name: "home" };
  if (page === "about") return { name: "about" };
  if (page === "contact") return { name: "contact" };
  if (page === "work") {
    const project = PROJECTS.find((p) => p.id === a);
    if (project) return { name: "project", id: a };
    return { name: "work", cat: a || "all" };
  }
  return { name: "home" };
}

function header(active) {
  const items = [
    ["#/about", "关于", active === "about" || active === "home"],
    ["#/work", "作品", active === "work" || active === "project"],
    ["#/work/brand", "品牌设计", active === "brand"],
    ["#/work/illustration", "插画设计", active === "illustration"],
    ["#/work/visual", "视觉设计", active === "visual"],
    ["#/work/ip", "IP设计", active === "ip"],
  ];
  return `
    <header class="site-header">
      <div class="brand-bar">
        <a class="logo" href="#/">刘筱寒</a>
      </div>
      <nav class="main-nav">
        ${items
          .map(
            ([href, label, on]) =>
              `<a href="${href}" class="${on ? "is-active" : ""}">${label}</a>`
          )
          .join("")}
      </nav>
    </header>
  `;
}

function footer() {
  return `
    <section class="cta-band reveal">
      <h2>开放合作</h2>
      <p>品牌升级、活动视觉、插画与 IP，都可以从一封邮件开始。</p>
      <a class="pill dark magnetic" href="mailto:${EMAIL}">联系合作</a>
    </section>
    <footer class="site-footer">
      <div class="footer-grid">
        <div>
          <h4>刘筱寒</h4>
          <p>品牌设计 · 插画设计 · 视觉设计 · IP设计<br />Personal Portfolio 2026</p>
        </div>
        <div>
          <h4>浏览</h4>
          <p>
            <a href="#/about">关于</a><br />
            <a href="#/work">作品</a><br />
            <a href="#/contact">联系</a>
          </p>
        </div>
        <div>
          <h4>合作</h4>
          <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
        </div>
      </div>
      <p class="copyright">© ${new Date().getFullYear()} 刘筱寒</p>
    </footer>
  `;
}

function card(p) {
  return `
    <a class="work-card reveal" href="#/work/${p.id}">
      <img src="${asset(p.cover)}" alt="${p.title}" />
      <div class="meta">
        <h3>${p.title}</h3>
        <span>${catLabel(p.category)}</span>
      </div>
    </a>
  `;
}

function home() {
  const featured = HOME_ORDER.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);
  return `
    ${header("home")}
    <section class="split-hero">
      <div class="panel bg-dusty">
        <div class="hero-copy">
          <p class="hero-kicker">Brand · Illustration · Visual · IP</p>
          <h1>做出让人记住的设计，<br />而不是被遗忘的画面。</h1>
          <a class="pill magnetic" href="#/work">查看作品</a>
        </div>
      </div>
      <div class="hero-photo"><img src="${PORTRAIT}" alt="刘筱寒" /></div>
    </section>
    ${aboutBody()}
    <section class="section-pad">
      <p class="kicker reveal">Selected work</p>
      <div class="work-grid">${featured.map(card).join("")}</div>
    </section>
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <span>品牌视觉 · LOGO · VIS · IP · 插画 · 物料 · 品牌视觉 · LOGO · VIS · IP · 插画 · 物料 · </span>
        <span>品牌视觉 · LOGO · VIS · IP · 插画 · 物料 · 品牌视觉 · LOGO · VIS · IP · 插画 · 物料 · </span>
      </div>
    </div>
    ${footer()}
  `;
}

function aboutBody() {
  return `
    <div class="about-art reveal">
      <img src="${ABOUT_ART}" alt="" />
    </div>
    <div class="about-wrap reveal">
      <p class="hello">Hello</p>
      <h2>关于我</h2>
      <p class="bio">你好，我是刘筱寒。专注品牌设计、插画、视觉系统与 IP 角色塑造。习惯从东方语境与社群温度出发，把概念落到可执行、可延展的视觉语言。</p>
      <p class="bio">书法可以成为标志，节气可以成为品牌时序，火烈鸟可以成为连接者。设计要好看，更要能被记住、被使用、被延续。</p>
    </div>
    <div class="resume">
      <h3 class="reveal">教育经历</h3>
      <div class="job reveal">
        <div>
          <h4>上海视觉艺术学院<span class="role">数字媒体艺术专业 · 2013–2017</span></h4>
        </div>
      </div>
      <h3 class="reveal">工作经历</h3>
      <div class="job reveal">
        <div>
          <h4>首程资本参加学院<span class="role">品牌设计 · 2022–2026</span></h4>
        </div>
        <ul>
          <li>品牌视觉：课程主视觉、LOGO、VIS 规范系统、IP 形象设计与延展应用</li>
          <li>平面物料：活动 / 课程海报、周边礼品文创、节气主题插画</li>
          <li>UI 界面：小程序界面、官方网站页面设计</li>
          <li>动态物料：短视频视觉，配合课程宣传产出动态素材</li>
          <li>落地支持：把控风格统一，输出可落地文件，保障线上线下物料一致</li>
        </ul>
      </div>
      <div class="job reveal">
        <div>
          <h4>上海淡远艺术设计有限公司<span class="role">平面设计 · 2018–2022</span></h4>
        </div>
        <ul>
          <li>公司品牌设计与 logo 创意</li>
          <li>海报等日常宣发设计</li>
          <li>公众号排版以及维护</li>
          <li>公司礼品设计</li>
        </ul>
      </div>
      <div class="meta-grid reveal">
        <div>
          <h3>证书</h3>
          <p>英语四级证书 · 计算机二级证书 · 普通话二级甲等证书</p>
        </div>
        <div>
          <h3>工具</h3>
          <p>Illustrator · Photoshop · Premiere · Codex</p>
        </div>
      </div>
    </div>
  `;
}

function work(cat) {
  const list = PROJECTS.filter((p) => cat === "all" || p.category === cat);
  const filters = [{ id: "all", label: "全部" }, ...CATEGORIES];
  const title = cat === "all" ? "作品" : catLabel(cat);
  return `
    ${header(cat === "all" ? "work" : cat)}
    <section class="split-hero split-hero--short">
      <div class="panel bg-rose">
        <div class="hero-copy">
          <h1>${title}</h1>
          <p class="lede">品牌、视觉、插画与 IP。点击封面进入完整项目。</p>
        </div>
      </div>
      <div class="panel bg-dusty">
        <div class="hero-copy">
          <h1>不求花哨。<br />只做能落地的系统。</h1>
        </div>
      </div>
    </section>
    <div class="filter-bar">
      ${filters
        .map(
          (f) =>
            `<a href="#/work${f.id === "all" ? "" : "/" + f.id}" class="magnetic ${
              (cat === "all" && f.id === "all") || cat === f.id ? "is-active" : ""
            }">${f.label}</a>`
        )
        .join("")}
    </div>
    <div class="work-grid">${list.map(card).join("")}</div>
    ${footer()}
  `;
}

function project(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return work("all");
  const i = PROJECTS.findIndex((x) => x.id === id);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const gallery = p.images
    .map(
      (src) =>
        `<button class="gallery-item reveal" data-src="${asset(src)}" type="button">
          <img src="${asset(src)}" alt="${p.title}" />
        </button>`
    )
    .join("");
  const pdf = p.pdf
    ? `<embed src="${asset(p.pdf)}" type="application/pdf" />`
    : "";
  return `
    ${header("project")}
    <div class="project-head reveal">
      <p class="cat">${catLabel(p.category)}</p>
      <h1>${p.title}</h1>
      <p>${p.summary}</p>
    </div>
    <div class="gallery">${gallery}${pdf}</div>
    <div class="pager">
      <a href="#/work/${prev.id}">← ${prev.title}</a>
      <a href="#/work/${next.id}">${next.title} →</a>
    </div>
    ${footer()}
  `;
}

function about() {
  return `
    ${header("about")}
    <section class="split-hero">
      <div class="panel bg-dusty">
        <div class="hero-copy">
          <p class="hero-kicker">Brand · Illustration · Visual · IP</p>
          <h1>做出让人记住的设计，<br />而不是被遗忘的画面。</h1>
          <a class="pill magnetic" href="#/work">查看作品</a>
        </div>
      </div>
      <div class="hero-photo"><img src="${PORTRAIT}" alt="刘筱寒" /></div>
    </section>
    ${aboutBody()}
    <p class="kicker values-kicker reveal">What I’m into</p>
    <section class="values">
      <article class="value reveal">
        <h3>Authentic aesthetics</h3>
        <p>用手绘细节和可延展的系统，做出一眼能认出来、也能长期用下去的品牌语言。</p>
      </article>
      <article class="value reveal">
        <h3>Cultivating creativity</h3>
        <p>品牌、活动主视觉、插画和 IP 一起做，换媒介、换场景，把同一套气质铺开。</p>
      </article>
      <article class="value reveal">
        <h3>Good-vibes process</h3>
        <p>先把规范和风格定清楚，再对齐落地文件，让线上线下物料不用反复猜。</p>
      </article>
      <article class="value reveal">
        <h3>An all-out delivery</h3>
        <p>不只给一张主视觉。标识、物料、插画、界面和延展，尽量一次交付完整。</p>
      </article>
    </section>
    ${footer()}
  `;
}

function contact() {
  return `
    ${header("contact")}
    <section class="contact-hero">
      <div class="hero-copy">
        <h1>Call me,<br />write me.</h1>
        <a class="mail" href="mailto:${EMAIL}">${EMAIL}</a>
        <div><a class="pill magnetic" href="#/work">先看作品</a></div>
      </div>
    </section>
    ${footer()}
  `;
}

function bindReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  nodes.forEach((el) => io.observe(el));
}

function bindCardSpotlights() {
  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

function bindMagnetic() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.28;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}

function bindLightbox() {
  document.querySelectorAll(".gallery-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      const overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.innerHTML = `<img src="${src}" alt="" />`;
      overlay.addEventListener("click", () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });
}

function render() {
  const r = parseRoute();
  let html = "";
  if (r.name === "about") html = about();
  else if (r.name === "contact") html = contact();
  else if (r.name === "project") html = project(r.id);
  else if (r.name === "work") html = work(r.cat);
  else html = home();
  const app = document.getElementById("app");
  app.classList.remove("page-in");
  app.innerHTML = html;
  requestAnimationFrame(() => app.classList.add("page-in"));
  window.scrollTo(0, 0);
  bindReveals();
  bindCardSpotlights();
  bindMagnetic();
  bindLightbox();
}

function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) {
    glow.style.display = "none";
    return;
  }
  document.body.classList.add("has-glow");
  let x = window.innerWidth / 2;
  let y = window.innerHeight * 0.28;
  let tx = x;
  let ty = y;
  const root = document.documentElement;
  window.addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      glow.classList.add("is-on");
    },
    { passive: true }
  );
  window.addEventListener("pointerleave", () => glow.classList.remove("is-on"));
  const tick = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    root.style.setProperty("--glow-x", `${x}px`);
    root.style.setProperty("--glow-y", `${y}px`);
    requestAnimationFrame(tick);
  };
  tick();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  initCursorGlow();
  render();
});
