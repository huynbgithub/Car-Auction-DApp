import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cors from 'cors'
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    
    app.use(cors({
        origin: 'http://192.168.1.20:3000',
        methods: '*',
        allowedHeaders: '*',
        maxAge: 3600,
    }))
    await app.listen(3001)
}
bootstrap()
