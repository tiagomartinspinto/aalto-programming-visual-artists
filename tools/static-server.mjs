import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

// A minimal static file server for local browser smoke testing. No
// framework is needed for serving a static GitHub Pages repository, so this
// uses only node:http and node:fs.
const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".gif", "image/gif"],
  [".pdf", "application/pdf"],
  [".mp4", "video/mp4"],
  [".mp3", "audio/mpeg"],
  [".txt", "text/plain; charset=utf-8"],
  [".pde", "text/plain; charset=utf-8"],
  [".rb", "text/plain; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".ico", "image/x-icon"],
]);

function resolveFile(rootDir, requestUrl) {
  const decoded = decodeURIComponent((requestUrl || "/").split("?")[0].split("#")[0]);
  const resolved = path.normalize(path.join(rootDir, decoded));
  if (resolved !== rootDir && !resolved.startsWith(rootDir + path.sep)) return null; // block path traversal
  let filePath = resolved;
  try {
    if (statSync(filePath).isDirectory()) filePath = path.join(filePath, "index.html");
    if (statSync(filePath).isFile()) return filePath;
  } catch {
    return null;
  }
  return null;
}

/**
 * Starts a local static server for `rootDir`, trying `preferredPort` first
 * and falling back to an OS-assigned free port if it is already in use.
 * Returns { url, close }.
 */
export function startStaticServer({ rootDir, preferredPort = 8123 }) {
  return new Promise((resolve, reject) => {
    const server = createServer((request, response) => {
      const filePath = resolveFile(rootDir, request.url);
      if (!filePath || !existsSync(filePath)) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }
      const contentType = mimeTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream";
      response.writeHead(200, { "Content-Type": contentType });
      createReadStream(filePath).pipe(response);
    });

    let fellBack = false;
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE" && !fellBack) {
        fellBack = true;
        server.listen(0, "127.0.0.1");
        return;
      }
      reject(error);
    });

    server.listen(preferredPort, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({
        url: `http://127.0.0.1:${port}/`,
        close: () => new Promise((resolveClose) => server.close(() => resolveClose())),
      });
    });
  });
}
