import { ApiProperty} from '@nestjs/swagger'

export class Jwt {
    @ApiProperty()
    public jwt: string;
}