import { inngest } from "./client";
import { db } from "@/lib/prisma";
import { generateAIInsights } from "@/actions/dashboard";

export const generateIndustryInsights = inngest.createFunction(
  { id: "generate-industry-insights" },
  { cron: "0 0 * * 0" }, // Runs every Sunday at midnight
  async ({ step }) => {
    // Get all unique industries that need updates
    const industries = await step.run("fetch-industries", async () => {
      return await db.industryInsight.findMany({
        where: {
          nextUpdate: {
            lte: new Date(),
          },
        },
        select: {
          industry: true,
        },
      });
    });

    // Update insights for each industry
    for (const { industry } of industries) {
      await step.run(`update-${industry}`, async () => {
        try {
          const insights = await generateAIInsights(industry);

          await db.industryInsight.update({
            where: { industry },
            data: {
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
            },
          });

          return { industry, status: "updated" };
        } catch (error) {
          console.error(`Error updating ${industry}:`, error);
          return { industry, status: "failed", error: error.message };
        }
      });
    }

    return {
      message: "Industry insights updated",
      count: industries.length,
    };
  }
);
