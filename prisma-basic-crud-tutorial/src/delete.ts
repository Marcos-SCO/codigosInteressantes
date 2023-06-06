import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    /* const deleteMany = await prisma.youtube_channels.deleteMany({
      where: {
        subscribers: {
          lt: 515
        },
      },
    }); */

    const deleteOne = await prisma.youtube_channels.delete({
      where: {
        id: 200,
      },
    });

    console.log(deleteOne);

  }

  catch (err) {
    console.log(err);
  }

  finally {
    await prisma.$disconnect();
  }
}

main();