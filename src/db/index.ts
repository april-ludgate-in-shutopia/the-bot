import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

// (async () => {
//   //   await prisma.role.create({ data: { type: "system" } });
//   const role = await prisma.role.findFirst({ where: { type: "system" } });
//   if (!role) {
//     return;
//   }
//   await prisma.prompt.create({
//     data: { message: "hello", roleType: role.type },
//   });
// })();
