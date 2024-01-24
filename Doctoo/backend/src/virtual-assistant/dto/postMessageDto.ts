import { IsString } from 'class-validator';
export class PostMesageDto {
  @IsString()
  public message: string;
}
