import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('TodoApp API')
  .setDescription('API teste de lista de tarefas \'Todo\' com CRUD')
  .setVersion('0.0.1')
  //remover tag por enquanto (botar em outro lugar segundo professor)
  //.addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  // entre aspas está o endereço da documentação swagger. ex: localhost:3000/swagger
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  await app.listen(3000);
}
bootstrap();
