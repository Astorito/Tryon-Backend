import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  try {
    // Generar API key
    const apiKey = `sk_${crypto.randomBytes(32).toString('hex')}`;

    // Crear cliente de prueba
    const client = await prisma.client.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        name: 'Test Client',
        email: 'test@example.com',
        apiKey: apiKey,
        isActive: true,
      },
    });

    console.log('✅ Cliente creado/actualizado:');
    console.log(`   ID: ${client.id}`);
    console.log(`   Nombre: ${client.name}`);
    console.log(`   Email: ${client.email}`);
    console.log(`   API Key: ${apiKey}`);
    console.log('\n⚠️  Guarda esta API key en un lugar seguro (no la commit en git)');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
