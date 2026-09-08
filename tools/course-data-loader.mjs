import { readFileSync } from "node:fs";
import vm from "node:vm";

// Shared by tools/check-site.mjs and tools/smoke-test.mjs so both tools read
// years/<year>/course-data.js the same way. Returns the parsed
// window.COURSE_DATA object, or undefined if the file does not define one.
export function loadCourseData(filePath) {
  const source = readFileSync(filePath, "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: filePath });
  return context.window.COURSE_DATA;
}
