<<<<<<< HEAD
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
=======
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
>>>>>>> 1edcaa07bd983d579b2a952ae0d9cb5360651b5f

export class CreateCommentDto {
  @ApiProperty({ description: 'The ID of the post' })
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @ApiProperty({ description: 'The ID of the community user' })
  @IsNotEmpty()
  @IsNumber()
  communityUserId: number;

  @ApiProperty({ description: 'The ID of the artist', required: false })
  @IsOptional()
  @IsNumber()
  artistId: number | null;

  @ApiProperty({ description: 'The comment text' })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({ description: 'The URL of the image', required: false })
  @IsOptional()
  @IsUrl()
  imageUrl: string | null;
}
