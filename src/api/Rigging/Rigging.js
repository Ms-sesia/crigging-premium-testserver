import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default {
  CraneData: {
    riggingData: async (parent) => await prisma.craneData.findUnique({ where: { id: parent.id } }).riggingData(),
    user: async (parent) => await prisma.user.findUnique({ where: { id: parent.id } }).user(),
  },
  RiggingData: {
    edgeDistance: async (parent) => await prisma.edgeDistance.findUnique({ where: { id: parent.id } }).edgeDistance(),
    workBuilding: async (parent) => await prisma.workBuilding.findUnique({ where: { id: parent.id } }).workBuilding(),
    block: async (parent) => await prisma.block.findUnique({ where: { id: parent.id } }).block(),
  },
};
