import { IsString, Length, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMascotaDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    especie!: string;

    @IsString()
    @IsNotEmpty()
    @Length(4, 25, { message: 'La raza debe tener entre 4 y 25 dígitos' })
    raza!: string;
    
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @Length(255)
    foto!: string;

    @IsString()
    @Length(100, 500, { message: 'La historia clinica debe tener entre 100 y 500 dígitos' })
    historia_clinica!: string;

    @IsNumber()
    @IsNotEmpty()
    clienteId!: number;
}

