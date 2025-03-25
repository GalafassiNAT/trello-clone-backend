import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { tags } from './config/swagger';
import { ConfigService } from '@nestjs/config';

function setupConfigurations(app: INestApplication) {
	app.setGlobalPrefix('/api/');

	app.enableVersioning({
		type: VersioningType.URI,
	});

	app.enableCors();
}

function setupDocumentation(app: INestApplication) {
	const schema = new DocumentBuilder()
		.setTitle('Trello Clone Documentation')
		.setDescription('API Documentation for Trello Clone')
		.setVersion('0.1');

	for (const tag in tags) {
		schema.addTag(tag, tags[tag]);
	}

	schema.addBearerAuth();

	const config = schema.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document, {
		customSiteTitle: 'Trello Clone Documentation',
		swaggerOptions: {
			persistAuthorization: true,
		},
	});
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	setupConfigurations(app);
	setupDocumentation(app);

	const configService = app.get(ConfigService);
	try {
		await app.listen(configService.get<string>('port') || 3000);
	} catch (error) {
		console.error('Error on start server', error);
	}
}

bootstrap().catch((error) => {
	console.error('Bootstrap failed:', error);
});
