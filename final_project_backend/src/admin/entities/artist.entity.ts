import { IsInt, IsNotEmpty, IsString } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  artist_id: number;
  /**
   * 그룹 ID
   * @example 1
   */
  @IsNotEmpty({ message: `그룹 ID를 입력해 주세요.` })
  @IsInt()
  @Column()
  community_id: number;
  /**
   * 회원 ID
   * @example 1
   */
  @IsNotEmpty({ message: `유저 ID를 입력해 주세요.` })
  @IsInt()
  @Column()
  user_id: number;

  /**
   * 아티스트 닉네임
   * @example "츄 닉네임"
   */
  @IsNotEmpty({ message: `닉네임을 입력해 주세요.` })
  @IsString()
  @Column()
  artist_nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
