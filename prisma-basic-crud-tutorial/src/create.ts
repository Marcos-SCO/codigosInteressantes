import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { programmingChannels } from './objctsData';

async function main() {
  try {
    /* const createMany = await prisma.youtube_channels.createMany({
      data: programmingChannels,
      skipDuplicates: true,
    }); */

    const createOne = await prisma.youtube_channels.create({
      data: {
        name: "TechLead",
        description: "Real-life tech career advice from a former big tech software engineer.",
        subscribers: 900000,
        link: "https://www.youtube.com/c/TechLead"
      }
    });

    console.log(createOne);

  }

  catch (err) {
    console.log(err);
  }

  finally {
    await prisma.$disconnect();
  }
}

main();