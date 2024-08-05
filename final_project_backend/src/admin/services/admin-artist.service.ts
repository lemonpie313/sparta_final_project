import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Community } from './../../community/entities/community.entity';
import { CommunityUser } from 'src/community/entities/communityUser.entity';
import { MESSAGES } from 'src/constants/message.constant';
import { CreateArtistDto } from '../dto/create-artist.dto';
@Injectable()
export class AdminArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
    @InjectRepository(CommunityUser)
    private readonly communityUserRepository: Repository<CommunityUser>,
  ) {}
  // 아티스트 생성
  async createArtist(createArtistDto: CreateArtistDto) {
    const { communityId, userId, artistNickname } = createArtistDto;

    //만약 해당 커뮤니티가 없다면 false반환
    const existedCommunity = await this.communityRepository.findOneBy({
      communityId,
    });
    if (!existedCommunity)
      throw new NotFoundException(MESSAGES.COMMUNITY.COMMON.NOT_FOUND);

    //만약 해당 유저가 없다면 false 반환
    const existedUser = await this.userRepository.findOneBy({
      userId,
    });
    if (!existedUser)
      throw new NotFoundException(MESSAGES.USER.COMMON.NOT_FOUND);

    //이미 user_id로 가입된 아티스트라면 false반환
    const existedArtist = await this.artistRepository.findOneBy({
      artistNickname,
    });
    if (existedArtist)
      throw new ConflictException(MESSAGES.ARTIST.COMMON.DUPLICATED);

    const artist = await this.artistRepository.save({
      communityId,
      userId,
      artistNickname,
    });

    // 아티스트가 해당 그룹의 커뮤니티 가입
    await this.communityUserRepository.save({
      userId,
      communityId,
      nickName: artistNickname,
    });

    return artist;
  }

  // 아티스트 삭제
  async deleteArtist(artistId: number) {
    // 해당 아티스트 아이디가 없다면 false 반환
    const existedArtist = await this.artistRepository.findOneBy({ artistId });
    if (!existedArtist)
      throw new NotFoundException(MESSAGES.ARTIST.COMMON.NOT_FOUND);

    // 해당 아티스트 삭제 로직
    await this.artistRepository.delete({ artistId });
    await this.userRepository.delete({ userId: existedArtist.userId });

    return true;
  }
}
