import { writeFileSync } from "fs";
import { join } from "path";

// Simple seed script to generate mock data or setup local configurations
async function main() {
  console.log("🌱 Starting database seeding...");
  
  const mockData = {
    articles: [
      { id: 1, title: "Next.js 16 Clean Architecture", content: "..." },
      { id: 2, title: "TypeScript Strict Mode Rules", content: "..." }
    ]
  };

  const outputPath = join(__dirname, "../mock-db.json");
  writeFileSync(outputPath, JSON.stringify(mockData, null, 2));
  
  console.log("✅ Seeding completed! Mock database written to mock-db.json");
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
