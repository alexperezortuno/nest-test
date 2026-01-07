import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication, LogLevel, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const logLevels: LogLevel[] = process.env.LOG_LEVELS
        ? (process.env.LOG_LEVELS.split(',') as LogLevel[])
        : ['log', 'error', 'warn'];
    const port: number = Number(process.env.PORT) || 3000;
    const host: string = process.env.HOST || '0.0.0.0';
    const app: INestApplication = await NestFactory.create(AppModule, {
        logger: logLevels,
    });

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

    await app.listen(port, host);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
