import * as fingerprint from "@expo/fingerprint";


async function main() {
    const curr_fingerprint = await fingerprint.createFingerprintAsync('.');

// Make some changes to the project

    // Calculate the diff
    const diff = await fingerprint.diffFingerprintChangesAsync(curr_fingerprint, '.');
    console.log(diff);
}

main();



// import { createProjectHashAsync } from "@expo/fingerprint";
// import { execSync } from "node:child_process";
// import fs from "node:fs";
// import path from "node:path";

// const HASH_FILE = path.resolve(".last_native_hash");

// async function main() {
//   const currentHash = await createProjectHashAsync(process.cwd());
//   const previousHash = fs.existsSync(HASH_FILE)
//     ? fs.readFileSync(HASH_FILE, "utf8").trim()
//     : null;

//   if (previousHash === currentHash) {
//     console.log("✅ No native changes detected. OTA update is safe.");
//     return;
//   }

//   console.log("⚠️ Native changes detected! Bumping app version...");
//   try {
//     execSync("npm version patch --no-git-tag-version", { stdio: "inherit" });
//     fs.writeFileSync(HASH_FILE, currentHash, "utf8");
//     console.log("📌 Version bumped and new hash recorded.");
//   } catch (err) {
//     console.error("❌ Failed to bump version:", err);
//     process.exit(1);
//   }
// }

// main();
