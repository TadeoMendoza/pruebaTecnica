import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
  IsNumber,
  Min,
  Max,
  IsIn,
  IsOptional,
} from 'class-validator';
export class CreateRequestDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  lastname: string;

  @IsNotEmpty({ message: 'El monto es obligatorio' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(1000, { message: 'El monto no puede ser menor a 1000' })
  @Max(10000, { message: 'El monto no puede ser mayor a 10000' })
  amount: number;

  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @IsEmail({}, { message: 'El correo debe ser válido' })
  email: string;

  @IsNotEmpty({ message: 'Los meses son obligatorios' })
  @IsNumber({}, { message: 'Los meses deben ser un número' })
  @IsIn([6, 12, 18, 24], {
    message: 'Los meses permitidos son únicamente 6, 12, 18 o 24',
  })
  months: number;

  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @Matches(/^\d{8}$/, {
    message: 'El DNI debe contener exactamente 8 dígitos numéricos',
  })
  dni: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @Matches(/^9\d{8}$/, {
    message: 'El teléfono debe empezar con 9 y tener 9 dígitos numéricos',
  })
  phone: string;

  @IsOptional()
  @IsString()
  @IsIn(['PENDING', 'APPROVED', 'REJECTED'], {
    message: 'El status debe ser PENDING, APPROVED o REJECTED',
  })
  status: string = 'PENDING';
}
