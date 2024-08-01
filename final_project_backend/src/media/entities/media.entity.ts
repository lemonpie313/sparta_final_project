import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { MediaFile } from "./media-file.entity";

@Entity('media')
export class Media {
    @PrimaryGeneratedColumn({ unsigned: true })
    mediaId: number;

    @Column({ unsigned: true })
    communityId: number;

    @Column({ unsigned: true })
    managerId: number;

    /**
     * 미디어 제목
     * @example 'Celestial Born First Teaser'
     */
    @Column()
    @IsString()
    @IsNotEmpty()
    title: string;

    /**
     * 미디어 내용
     * @example 'Launch in 24.09.30'
     */
    @Column()
    @IsString()
    @IsNotEmpty()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
    @OneToMany(() => MediaFile, (mediaFile) => mediaFile.media)
    mediaFiles: MediaFile[];
}
