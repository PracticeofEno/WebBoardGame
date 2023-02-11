import {ApiProperty} from '@nestjs/swagger'

export abstract class PostAddUser {
    @ApiProperty()
    nickname: string;

    @ApiProperty()
    password: string;
}