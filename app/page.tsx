import Image from "next/image";
import styles from "./page.module.css";
import { PrismaClient, Prisma, UpdateStatus } from "@prisma/client";

const prisma = new PrismaClient();
const data: Prisma.UpdateSetCreateInput[] = [
  {
    name: "Update 1",
    description: "First update",
    status: UpdateStatus.FAILED,
    createdBy: "admin",
    createdAt: new Date(),
    deployedAt: new Date(),
  },
  {
    name: "Update 2",
    description: "Second update",
    status: UpdateStatus.IN_PROGRESS,
    createdBy: "admin",
    createdAt: new Date(),
    deployedAt: new Date(),
  },
  {
    name: "Update 3",
    description: "Third update",
    status: UpdateStatus.DEPLOYED,
    createdBy: "admin",
    createdAt: new Date(),
    deployedAt: new Date(),
  },
];

export default async function Home() {
  return await prisma.updateSet.create({
    data: data[0],
  });
}
