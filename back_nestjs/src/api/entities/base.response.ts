import { ApiProperty} from '@nestjs/swagger'

export abstract class BaseResponse {
    @ApiProperty()
    public code: number;

    @ApiProperty()
    message: string;
}