import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
async function main() {
  const atm = await prisma.atm.create({
    data:{
        balance: 100000.00,
    }
  })

  const bankNote20 = await prisma.bankNotes.create({
    data:{
        quantity: 1000,
        value: 20.00,
        atm_id: 1
    }
  });

  const bankNote50 = await prisma.bankNotes.create({
    data:{
        quantity: 1000,
        value: 50.00,
        atm_id: 1
    }
  })

  const bankNote100 = await prisma.bankNotes.create({
    data:{
        quantity: 300,
        value: 100.00,
        atm_id: 1
    }
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })