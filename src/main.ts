import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle('Catalog Test API')
        .setDescription('Catalog Test API Description')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    await app.listen(configService.get('APP_PORT'), () =>
        console.log(
            `Server started on http://localhost:${configService.get(
                'APP_PORT',
            )}`,
        ),
    );
}
bootstrap();
