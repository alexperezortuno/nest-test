import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    const port: number = Number(process.env.PORT) || 3000;

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.enableCors(
        {origin: '*'},
    );

    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
