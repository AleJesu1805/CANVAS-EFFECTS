if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

const viewRoot = document.querySelector("#app-view");
let gameLoadId = 0;

const routes = {
  arcade: { path: "./views/arcade", kind: "view" },
  game: {
    path: "./games/follow-particles",
    kind: "game",
    title: "Particle-Canvas",
  },
};

function loadViewStyles(viewPath) {
  document.querySelector("#view-styles")?.remove();

  const stylesheet = document.createElement("link");
  stylesheet.id = "view-styles";
  stylesheet.rel = "stylesheet";
  stylesheet.href = `${viewPath}/styles.css`;
  document.head.append(stylesheet);
}

async function loadView() {
  const requestedRoute = window.location.hash.slice(1) || "arcade";
  const route = routes[requestedRoute] ? requestedRoute : "arcade";
  const { path: viewPath, kind, title } = routes[route];

  try {
    const response = await fetch(`${viewPath}/index.html`);
    if (!response.ok) throw new Error(`Vista no encontrada: ${route}`);
    viewRoot.innerHTML = await response.text();
    loadViewStyles(viewPath);
    if (kind === "game") {
      await import(`${viewPath}/script.js?spa-load=${++gameLoadId}`);
      document.title = `${title} | Sala de juegos`;
      return;
    }

    const module = await import(`${viewPath}/view.js`);
    module.mount?.(viewRoot);
    document.title = `${module.title || "Abstract Experience"} | Sala de juegos`;
  } catch (error) {
    viewRoot.innerHTML =
      '<section class="error-view"><h1>No pudimos abrir esta vista</h1><p>Comprueba que la SPA se esta ejecutando desde un servidor local.</p></section>';
    console.error(error);
  }
}

window.addEventListener("hashchange", loadView);
loadView();
