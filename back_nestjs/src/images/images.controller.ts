import {
  Controller,
  Get,
  HttpException,
  Param,
  Response,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { join } from 'path';
import { existsSync } from 'fs';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('images')
@ApiTags('images API')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get('/avatar/:number')
  @ApiParam({
    name: 'number',
    required: true,
    description: 'number에 맞는 아바타 svg 반납',
  })
  @ApiOperation({
    summary: 'Get-아바타',
    description: '0~45까지 있음. 없으면 454, number가 empty면 400',
  })
  @ApiCreatedResponse({ description: 'SVG데이터' })
  getImage(@Param('number') number, @Response() res) {
    if (number === undefined) throw new HttpException('number is empty', 400);
    let path = join(process.cwd(), './src/images/avatar/' + number + '.svg');
    //console.log(`maked path = ${path}`);
    if (existsSync(path)) {
      res.sendFile(path);
    } else {
      throw new HttpException('Not exist avatar file', 454);
    }
  }
}
