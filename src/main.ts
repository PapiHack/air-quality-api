import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('Yassir - Air Quality')
    .setDescription('The Air Quality API powered by Yassir (Coding Challenge)')
    .setVersion('1.0')
    .setContact('Meïssa B.C MBAYE', 'https://www.linkedin.com/in/meissa-bc-mbaye', 'mssmbaye@gmail.com')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(port);
}

bootstrap();
