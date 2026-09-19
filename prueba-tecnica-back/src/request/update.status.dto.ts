import { IsEnum, IsNotEmpty } from 'class-validator';

export enum SolicitudStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export class UpdateStatusDto {
    @IsEnum(SolicitudStatus, { message: 'El estado no es válido' })
    @IsNotEmpty()
    status: SolicitudStatus;
}