import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import blockchainConfig from '@config/blockchain.config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    console.log(blockchainConfig().privateKey)
    await app.listen(3000)
}
bootstrap()
