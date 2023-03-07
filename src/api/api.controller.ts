import {
  Controller,
  Query,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { idSchema } from './schema';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('movies')
  async searchMovies(@Query('search') search: string) {
    if (typeof search === 'undefined')
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    const result = await this.apiService.searchMovies(search);
    return result;
  }

  @Get('movies/:id')
  async getMoviesById(@Param('id') id: string) {
    const validation = idSchema.validate(id);
    if (validation.error)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    const result = await this.apiService.getMovieById(id);
    return result;
  }
}
