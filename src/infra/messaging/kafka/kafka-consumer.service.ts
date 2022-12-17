import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {

    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['evolving-katydid-7758-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'ZXZvbHZpbmcta2F0eWRpZC03NzU4JCPIZ8uBqHQUlS0ErEDyqpQfsYnco74OfEc',
                    password: 'O76cHC2EoLwV_zKpnvR-jXpLRXdvzhSCAdrrajnNtf5BQ7YYlt4LCg7VnH5dNKgIAgNgDA==',
                },
                ssl: true,
                connectionTimeout: 10000
            }
        })
    }

    async onModuleDestroy() {
        await this.close();
    }

}