const { execSync } = require("child_process");
const fs = require("fs");

/**
 * 在指定日期创建一个 commit
 * @param {string} date - 格式为 "YYYY-MM-DD HH:mm:ss"
 */
function createCommit(date) {
  // 修改一个文件，确保有内容可以提交
  fs.writeFileSync("data.txt", `Commit for ${date}\n`, { flag: "a" });

  // 关键：通过环境变量设置 Git 时间
  const cmd = `git add . && GIT_AUTHOR_DATE="${date}" GIT_COMMITTER_DATE="${date}" git commit -m "spray commit at ${date}"`;

  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    console.error("提交失败:", e.message);
  }
}

// 示例：在 3 天前画一个点
createCommit("2026-01-27 12:00:00");
