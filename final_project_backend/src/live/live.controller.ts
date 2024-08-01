import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { LiveService } from './live.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/types/user-role.type';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateLiveDto } from './dtos/create-live.dto';

@ApiTags('live')
@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  /**
   * 라이브 스트리밍 제목 등록 + 키 받아오기
   * 
   * @returns
   */
//   @ApiBearerAuth()
//   @Roles(UserRole.User)
//   @UseGuards(RolesGuard)
  @Post('/')
  async findMembershipPayments(
    @Request() req,
    @Body() createLiveDto: CreateLiveDto,
  ) {
    const { title, type } = createLiveDto;
    const liveRtmpAddress = this.liveService.createLive(1, title, type);
    return {
      status: HttpStatus.CREATED,
      message: '완료',
      data: liveRtmpAddress,
    };
  }
}
